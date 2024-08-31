import danger_plugin_pr_hygiene.{
  Config, Off, PrHygieneOptions, PrHygieneRules, default_options,
}
import danger_plugin_pr_hygiene/rules/use_imperative_mood.{
  UseImperativeMoodConfig,
}
import gleam/option.{None, Some}
import test_helpers.{test_rule}

const passing_pr_titles = ["Add feature X", "Remove feature X"]

const failing_pr_titles = [
  "Adds feature X", "Adding feature Y", "Added feature Z", "Removes feature X",
  "Removing feature Y", "Removed feature Z",
]

pub fn use_imperative_mood_tests() {
  test_rule(
    "Use Imperative Mood",
    config: fn(emit_level) {
      case emit_level {
        Some(emit_level) ->
          PrHygieneOptions(
            rules: PrHygieneRules(
              ..default_options().rules,
              use_imperative_mood: Config(
                UseImperativeMoodConfig(
                  ..use_imperative_mood.default_config(),
                  level: emit_level,
                ),
              ),
            ),
          )
        None ->
          PrHygieneOptions(
            rules: PrHygieneRules(
              ..default_options().rules,
              use_imperative_mood: Off,
            ),
          )
      }
    },
    passing: passing_pr_titles,
    failing: failing_pr_titles,
  )
}
