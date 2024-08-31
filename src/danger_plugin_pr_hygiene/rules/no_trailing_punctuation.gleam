import danger_plugin_pr_hygiene/emit_level.{type EmitLevel}
import danger_plugin_pr_hygiene/rule.{type Violation, Violation}
import gleam/list
import gleam/string

pub type NoTrailingPunctuationConfig {
  NoTrailingPunctuationConfig(level: EmitLevel, message: String)
}

pub fn default_config() -> NoTrailingPunctuationConfig {
  NoTrailingPunctuationConfig(
    level: emit_level.Warn,
    message: "Do not end PR titles with punctuation.",
  )
}

pub fn no_trailing_punctuation(pr_title: String) -> Result(Nil, List(Violation)) {
  let punctuation_marks = [".", "!", "?", ",", ":", ";"]

  let has_trailing_punctuation =
    punctuation_marks
    |> list.any(fn(punctuation_mark) {
      pr_title
      |> string.ends_with(punctuation_mark)
    })

  case has_trailing_punctuation {
    True -> {
      let end = string.length(pr_title)
      let start = end - 1

      Error([Violation(span: #(start, end))])
    }
    False -> Ok(Nil)
  }
}
