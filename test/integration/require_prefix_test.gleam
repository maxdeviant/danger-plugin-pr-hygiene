import danger_plugin_pr_hygiene.{
  Config, PrHygieneOptions, PrHygieneRules, default_options,
}
import danger_plugin_pr_hygiene/rules/require_prefix.{RequirePrefixConfig}
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
    config: fn(level) {
      PrHygieneOptions(
        ..default_options(),
        rules: PrHygieneRules(
          ..default_options().rules,
          require_prefix: Config(
            RequirePrefixConfig(..require_prefix.default_config(), level:),
          ),
        ),
      )
    },
    passing: passing_pr_titles,
    failing: failing_pr_titles,
  )
}
