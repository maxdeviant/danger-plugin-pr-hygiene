import danger_plugin_pr_hygiene/rule.{Violation}
import danger_plugin_pr_hygiene/rules/no_conventional_commits.{
  default_config, no_conventional_commits,
}
import gleam/list
import gleam/string
import startest.{describe, it}
import startest/expect

pub fn no_conventional_commits_tests() {
  let banned_types = default_config().banned_types

  describe("danger_plugin_pr_hygiene/rules/no_conventional_commits", [
    describe("no_conventional_commits", [
      describe(
        "when the PR title does not start with a Conventional Commits prefix",
        [
          it("returns Ok", fn() {
            no_conventional_commits(banned_types, "Update the build script")
            |> expect.to_be_ok
          }),
        ],
      ),
      ..banned_types
      |> list.flat_map(fn(prefix) {
        let prefix_with_scope = prefix <> "(scope)"

        [
          describe("when the PR title starts with `" <> prefix <> "`", [
            it("returns an Error containing a violation", fn() {
              let base_title = "Update the build script"

              no_conventional_commits(
                banned_types,
                prefix <> ": " <> base_title,
              )
              |> expect.to_be_error
              |> expect.to_equal([
                Violation(span: #(0, string.length(prefix) + 1)),
              ])
            }),
          ]),
          describe(
            "when the PR title starts with `" <> prefix_with_scope <> "`",
            [
              it("returns an Error containing a violation", fn() {
                let base_title = "Update the build script"

                no_conventional_commits(
                  banned_types,
                  prefix_with_scope <> ": " <> base_title,
                )
                |> expect.to_be_error
                |> expect.to_equal([
                  Violation(span: #(0, string.length(prefix_with_scope) + 1)),
                ])
              }),
            ],
          ),
        ]
      })
    ]),
  ])
}
