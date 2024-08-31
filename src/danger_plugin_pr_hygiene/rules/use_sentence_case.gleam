import danger_plugin_pr_hygiene/emit_level.{type EmitLevel}
import danger_plugin_pr_hygiene/rule.{type Violation, Violation}
import gleam/regex

pub type UseSentenceCaseConfig {
  UseSentenceCaseConfig(level: EmitLevel, message: String)
}

pub fn default_config() -> UseSentenceCaseConfig {
  UseSentenceCaseConfig(
    level: emit_level.Warn,
    message: "Write PR titles using sentence case.",
  )
}

pub fn use_sentence_case(pr_title: String) -> Result(Nil, List(Violation)) {
  let assert Ok(pattern) = regex.from_string("^[a-z]")

  case regex.check(pattern, pr_title) {
    True -> Error([Violation(span: #(0, 1))])
    False -> Ok(Nil)
  }
}
