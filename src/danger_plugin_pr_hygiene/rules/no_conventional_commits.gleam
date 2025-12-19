import danger_plugin_pr_hygiene/emit_level.{type EmitLevel}
import danger_plugin_pr_hygiene/rule.{type Violation, Violation}
import gleam/regex
import gleam/string

pub type NoConventionalCommitsConfig {
  NoConventionalCommitsConfig(
    level: EmitLevel,
    message: String,
    banned_types: List(String),
  )
}

pub fn default_config() -> NoConventionalCommitsConfig {
  NoConventionalCommitsConfig(
    level: emit_level.Warn,
    message: "Do not use Conventional Commits in PR titles.",
    banned_types: [
      "feat", "fix", "docs", "style", "refactor", "perf", "test", "chore", "ci",
      "build", "revert",
    ],
  )
}

pub fn no_conventional_commits(
  banned_types: List(String),
  pr_title: String,
) -> Result(Nil, List(Violation)) {
  let types = banned_types |> string.join("|")

  let assert Ok(pattern) =
    regex.from_string("^(" <> types <> ")(\\([a-z0-9-_]+\\))?:\\s.+")

  case regex.check(pattern, pr_title) {
    True -> {
      let colon_position = case string.split_once(pr_title, on: ":") {
        Ok(#(before, _)) -> string.length(before) + 1
        Error(_) -> 0
      }

      Error([Violation(span: #(0, colon_position))])
    }
    False -> Ok(Nil)
  }
}
