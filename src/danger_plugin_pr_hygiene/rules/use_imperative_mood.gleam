import danger_plugin_pr_hygiene/emit_level.{type EmitLevel}
import danger_plugin_pr_hygiene/grammar/verb_forms.{is_bare_infinitive}
import danger_plugin_pr_hygiene/rule.{type Violation, Violation}
import gleam/string

pub type UseImperativeMoodConfig {
  UseImperativeMoodConfig(level: EmitLevel, message: String)
}

pub fn default_config() -> UseImperativeMoodConfig {
  UseImperativeMoodConfig(
    level: emit_level.Warn,
    message: "Write PR titles using the imperative mood.",
  )
}

pub fn use_imperative_mood(pr_title: String) -> Result(Nil, List(Violation)) {
  let words = pr_title |> string.split(" ")

  case words {
    [word, ..] ->
      case is_bare_infinitive(word) {
        False -> {
          // If the PR title starts with a word that is not in its bare infinitive
          // then we can infer that it is a PR title along the lines of "Adds X",
          // which is not in the imperative mood.
          Error([Violation(span: #(0, string.length(word)))])
        }
        True -> Ok(Nil)
      }
    _ -> Ok(Nil)
  }
}
