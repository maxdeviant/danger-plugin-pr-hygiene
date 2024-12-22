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

  let number_of_trailing_punctuation_marks =
    pr_title
    |> string.to_graphemes
    |> list.reverse
    |> list.take_while(list.contains(punctuation_marks, _))
    |> list.length

  let has_trailing_punctuation = number_of_trailing_punctuation_marks > 0

  case has_trailing_punctuation {
    True -> {
      let end = string.length(pr_title)
      let start = end - number_of_trailing_punctuation_marks

      Error([Violation(span: #(start, end))])
    }
    False -> Ok(Nil)
  }
}
