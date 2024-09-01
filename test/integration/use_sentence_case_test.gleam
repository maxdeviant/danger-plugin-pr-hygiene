import danger_plugin_pr_hygiene.{
  Config, PrHygieneOptions, PrHygieneRules, default_options,
}
import danger_plugin_pr_hygiene/rules/use_sentence_case.{UseSentenceCaseConfig}
import test_helpers.{test_rule}

const passing_pr_titles = [
  "Send an email to the customer when a product is shipped",
  "feat: Allow provided config object to extend other configs",
  "feat(lang): Add Polish language",
]

const failing_pr_titles = [
  "send an email to the customer when a product is shipped",
  "feat: allow provided config object to extend other configs",
  "feat(lang): add Polish language",
]

pub fn use_sentence_case_tests() {
  test_rule(
    "Use Sentence Case",
    config: fn(level) {
      PrHygieneOptions(
        ..default_options(),
        rules: PrHygieneRules(
          ..default_options().rules,
          use_sentence_case: Config(
            UseSentenceCaseConfig(..use_sentence_case.default_config(), level:),
          ),
        ),
      )
    },
    passing: passing_pr_titles,
    failing: failing_pr_titles,
  )
}
