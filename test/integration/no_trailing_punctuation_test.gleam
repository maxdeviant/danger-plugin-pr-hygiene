import danger_plugin_pr_hygiene.{
  Config, Off, PrHygieneOptions, PrHygieneRules, default_options,
}
import danger_plugin_pr_hygiene/rules/no_trailing_punctuation.{
  NoTrailingPunctuationConfig,
}
import gleam/option.{None, Some}
import test_helpers.{test_rule}

const passing_pr_titles = [
  "Send an email to the customer when a product is shipped",
  "feat: Allow provided config object to extend other configs",
  "feat(lang): Add Polish language",
]

const failing_pr_titles = [
  "Send an email to the customer when a product is shipped.",
  "feat: Allow provided config object to extend other configs!",
  "feat(lang): Add Polish language?",
]

pub fn no_trailing_punctuation_tests() {
  test_rule(
    "No Trailing Punctuation",
    config: fn(emit_level) {
      case emit_level {
        Some(emit_level) ->
          PrHygieneOptions(
            rules: PrHygieneRules(
              ..default_options().rules,
              no_trailing_punctuation: Config(
                NoTrailingPunctuationConfig(
                  ..no_trailing_punctuation.default_config(),
                  level: emit_level,
                ),
              ),
            ),
          )
        None ->
          PrHygieneOptions(
            rules: PrHygieneRules(
              ..default_options().rules,
              no_trailing_punctuation: Off,
            ),
          )
      }
    },
    passing: passing_pr_titles,
    failing: failing_pr_titles,
  )
}
