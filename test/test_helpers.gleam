import danger_plugin_pr_hygiene.{
  type PrHygieneOptions, PrHygieneContext, make_pr_hygiene,
}
import danger_plugin_pr_hygiene/emit_level.{type EmitLevel}
import fake_danger
import gleam/list
import startest.{describe, it}
import startest/expect
import startest/test_tree.{type TestTree}

pub fn test_rule(
  name: String,
  config make_config: fn(EmitLevel) -> PrHygieneOptions,
  passing passing_pr_titles: List(String),
  failing failing_pr_titles: List(String),
) -> TestTree {
  describe("pr_hygiene: " <> name, [
    describe(
      "when enabled",
      [
        passing_pr_titles
          |> list.map(fn(pr_title) {
            describe("given \"" <> pr_title <> "\"", [
              it("does not emit anything", fn() {
                let danger = fake_danger.new()

                let message =
                  fake_danger.make_method(danger, fake_danger.Message)
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

                pr_hygiene(make_config(emit_level.Warn))

                fake_danger.calls(danger, fake_danger.Message)
                |> expect.to_equal([])
                fake_danger.calls(danger, fake_danger.Warn)
                |> expect.to_equal([])
                fake_danger.calls(danger, fake_danger.Fail)
                |> expect.to_equal([])
              }),
            ])
          }),
        failing_pr_titles
          |> list.map(fn(pr_title) {
            describe("given \"" <> pr_title <> "\"", [
              describe("with the `level` set to `message`", [
                it("emits a message", fn() {
                  let danger = fake_danger.new()

                  let message =
                    fake_danger.make_method(danger, fake_danger.Message)
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

                  pr_hygiene(make_config(emit_level.Message))

                  fake_danger.calls(danger, fake_danger.Message)
                  |> list.length
                  |> expect.to_equal(1)
                  fake_danger.calls(danger, fake_danger.Warn)
                  |> expect.to_equal([])
                  fake_danger.calls(danger, fake_danger.Fail)
                  |> expect.to_equal([])
                }),
              ]),
              describe("with the `level` set to `warn`", [
                it("emits a warning", fn() {
                  let danger = fake_danger.new()

                  let message =
                    fake_danger.make_method(danger, fake_danger.Message)
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

                  pr_hygiene(make_config(emit_level.Warn))

                  fake_danger.calls(danger, fake_danger.Message)
                  |> expect.to_equal([])
                  fake_danger.calls(danger, fake_danger.Warn)
                  |> list.length
                  |> expect.to_equal(1)
                  fake_danger.calls(danger, fake_danger.Fail)
                  |> expect.to_equal([])
                }),
              ]),
              describe("with the `level` set to `fail`", [
                it("emits a failure", fn() {
                  let danger = fake_danger.new()

                  let message =
                    fake_danger.make_method(danger, fake_danger.Message)
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

                  pr_hygiene(make_config(emit_level.Fail))

                  fake_danger.calls(danger, fake_danger.Message)
                  |> expect.to_equal([])
                  fake_danger.calls(danger, fake_danger.Warn)
                  |> expect.to_equal([])
                  fake_danger.calls(danger, fake_danger.Fail)
                  |> list.length
                  |> expect.to_equal(1)
                }),
              ]),
            ])
          }),
      ]
        |> list.concat,
    ),
  ])
}
