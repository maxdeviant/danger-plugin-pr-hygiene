import danger_plugin_pr_hygiene.{
  Config, Off, PrHygieneOptions, PrHygieneRules, default_options,
}
import danger_plugin_pr_hygiene/rules/require_prefix.{RequirePrefixConfig}
import gleam/option.{None, Some}
import test_helpers.{test_rule}

const passing_pr_titles = [
  "api: Add a new endpoint",
  "feat: Allow provided config object to extend other configs",
  "feat(lang): Add Polish language",
]

const failing_pr_titles = [
  "Add a new endpoint", "Allow provided config object to extend other configs",
  "Add Polish language",
]

pub fn require_prefix_tests() {
  test_rule(
    "Require Prefix",
    config: fn(emit_level) {
      case emit_level {
        Some(emit_level) ->
          PrHygieneOptions(
            ..default_options(),
            rules: PrHygieneRules(
              ..default_options().rules,
              require_prefix: Config(
                RequirePrefixConfig(
                  ..require_prefix.default_config(),
                  level: emit_level,
                ),
              ),
            ),
          )
        None ->
          PrHygieneOptions(
            ..default_options(),
            rules: PrHygieneRules(
              ..default_options().rules,
              require_prefix: Off,
            ),
          )
      }
    },
    passing: passing_pr_titles,
    failing: failing_pr_titles,
  )
}
