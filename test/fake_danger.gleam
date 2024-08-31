import gleam/javascript/array.{type Array}
import gleam/list
import gleam/string
import startest/assertion_error.{AssertionError}

pub type FakeDanger

pub type Method {
  Message
  Warn
  Fail
  Markdown
}

fn method_to_string(method: Method) -> String {
  case method {
    Message -> "message"
    Warn -> "warn"
    Fail -> "fail"
    Markdown -> "markdown"
  }
}

@external(javascript, "./fake_danger_ffi.mjs", "new_fake_danger")
pub fn new() -> FakeDanger

pub fn make_method(danger: FakeDanger, method: Method) {
  fn(message) { record_call(danger, method_to_string(method), message) }
}

pub fn calls(danger: FakeDanger, method: Method) -> List(String) {
  get_calls(danger, method_to_string(method))
  |> array.to_list
}

const feedback_link_prefix = "Have feedback on this plugin?"

pub fn expect_feedback_link(danger: FakeDanger) {
  let calls = calls(danger, Markdown)

  let has_feedback_link =
    calls
    |> list.any(fn(value) { string.starts_with(value, feedback_link_prefix) })
  case has_feedback_link {
    True -> Nil
    False ->
      AssertionError(
        string.concat([
          "Expected ",
          string.inspect(calls),
          " to contain string matching ",
          string.inspect(feedback_link_prefix),
        ]),
        string.inspect(calls),
        string.inspect(feedback_link_prefix),
      )
      |> assertion_error.raise
  }
}

pub fn expect_no_feedback_link(danger: FakeDanger) {
  let calls = calls(danger, Markdown)

  let has_feedback_link =
    calls
    |> list.any(fn(value) { string.starts_with(value, feedback_link_prefix) })
  case has_feedback_link {
    False -> Nil
    True ->
      AssertionError(
        string.concat([
          "Expected ",
          string.inspect(calls),
          " to not contain string matching ",
          string.inspect(feedback_link_prefix),
        ]),
        string.inspect(Nil),
        string.inspect(calls),
      )
      |> assertion_error.raise
  }
}

@external(javascript, "./fake_danger_ffi.mjs", "calls")
fn get_calls(danger: FakeDanger, method: String) -> Array(String)

@external(javascript, "./fake_danger_ffi.mjs", "record_call")
fn record_call(danger: FakeDanger, method: String, value: String) -> Nil
