import danger_plugin_pr_hygiene.{
  PrHygieneContext, default_options, make_pr_hygiene,
}
import fake_danger
import gleam/list
import startest.{describe, it}

const passing_pr_titles = [
  "Initial commit", "Initialize package",
  "Add functions to determine verb forms",
  "Add basic rule for imperative mood in PR titles", "Wire up the rule",
  "Make rule configurable", "Colocate rule config with the rule",
  "Add rule for no trailing punctuation in PR titles",
]

const failing_pr_titles = ["initializes package"]

pub fn all_tests() {
  describe(
    "pr_hygiene: All",
    [
      passing_pr_titles
        |> list.map(fn(pr_title) {
          describe("given \"" <> pr_title <> "\"", [
            it("does not emit anything", fn() {
              let danger = fake_danger.new()

              let message = fake_danger.make_method(danger, fake_danger.Message)
              let warn = fake_danger.make_method(danger, fake_danger.Warn)
              let fail = fake_danger.make_method(danger, fake_danger.Fail)
              let markdown =
                fake_danger.make_method(danger, fake_danger.Markdown)

              let pr_hygiene =
                make_pr_hygiene(PrHygieneContext(
                  message:,
                  warn:,
                  fail:,
                  markdown:,
                  pr_title:,
                ))

              pr_hygiene(default_options())

              // TODO: Add assertions.
              Nil
            }),
            it("does not render a feedback link", fn() {
              let message = fn(_message) { Nil }
              let warn = fn(_message) { Nil }
              let fail = fn(_message) { Nil }
              let markdown = fn(_message) { Nil }

              let pr_hygiene =
                make_pr_hygiene(PrHygieneContext(
                  message:,
                  warn:,
                  fail:,
                  markdown:,
                  pr_title:,
                ))

              pr_hygiene(default_options())

              // TODO: Add assertions.
              Nil
            }),
          ])
        }),
      failing_pr_titles
        |> list.map(fn(pr_title) {
          describe("given \"" <> pr_title <> "\"", [
            it("renders a feedback link", fn() {
              let message = fn(_message) { Nil }
              let warn = fn(_message) { Nil }
              let fail = fn(_message) { Nil }
              let markdown = fn(_message) { Nil }

              let pr_hygiene =
                make_pr_hygiene(PrHygieneContext(
                  message:,
                  warn:,
                  fail:,
                  markdown:,
                  pr_title:,
                ))

              pr_hygiene(default_options())

              // TODO: Add assertions.
              Nil
            }),
          ])
        }),
    ]
      |> list.concat,
  )
}
