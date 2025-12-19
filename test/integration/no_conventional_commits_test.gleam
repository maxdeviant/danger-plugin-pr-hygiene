import danger_plugin_pr_hygiene.{
  Config, PrHygieneOptions, PrHygieneRules, default_options,
}
import danger_plugin_pr_hygiene/rules/no_conventional_commits.{
  NoConventionalCommitsConfig,
}
import test_helpers.{test_rule}

const passing_pr_titles = [
  "Send an email to the customer when a product is shipped",
  "api: Add a new endpoint",
]

const failing_pr_titles = [
  "chore: Bump version",
  "feat: Allow provided config object to extend other configs",
  "feat(lang): Add Polish language",
]

pub fn no_conventional_commits_tests() {
  test_rule(
    "No Conventional Commits",
    config: fn(level) {
      PrHygieneOptions(
        ..default_options(),
        rules: PrHygieneRules(
          ..default_options().rules,
          no_conventional_commits: Config(
            NoConventionalCommitsConfig(
              ..no_conventional_commits.default_config(),
              level:,
            ),
          ),
        ),
      )
    },
    passing: passing_pr_titles,
    failing: failing_pr_titles,
  )
}
