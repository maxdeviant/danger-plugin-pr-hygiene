// import shakespeare/actors/key_value

pub type FakeDanger

pub type Method {
  Message
  Warn
  Fail
  Markdown
}

@external(javascript, "./fake_danger_ffi.mjs", "new_fake_danger")
pub fn new() -> FakeDanger

pub fn make_method(danger: FakeDanger, method: Method) {
  fn(message) { record_call(danger, method, message) }
}

@external(javascript, "./fake_danger_ffi.mjs", "record_call")
fn record_call(danger: FakeDanger, method: Method, value: String) -> Nil
