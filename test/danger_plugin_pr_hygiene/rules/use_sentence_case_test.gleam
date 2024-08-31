import danger_plugin_pr_hygiene/rule.{Violation}
import danger_plugin_pr_hygiene/rules/use_sentence_case.{use_sentence_case}
import startest.{describe, it}
import startest/expect

pub fn use_sentence_case_tests() {
  describe("danger_plugin_pr_hygiene/rules/use_sentence_case", [
    describe("use_sentence_case", [
      describe("when the PR title is written using sentence case", [
        it("returns Ok", fn() {
          use_sentence_case("Add a shiny new feature")
          |> expect.to_be_ok
        }),
      ]),
      describe("when the PR title starts with a lowercase letter", [
        it("returns an Error containing a violation", fn() {
          use_sentence_case("add a shiny new feature")
          |> expect.to_be_error
          |> expect.to_equal([Violation(span: #(0, 1))])
        }),
      ]),
    ]),
  ])
}
