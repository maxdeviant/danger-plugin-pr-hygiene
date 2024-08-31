import danger_plugin_pr_hygiene/rule.{Violation}
import danger_plugin_pr_hygiene/rules/use_imperative_mood.{use_imperative_mood}
import gleam/string
import startest.{describe, it}
import startest/expect

pub fn use_imperative_mood_tests() {
  describe("danger_plugin_pr_hygiene/rules/use_imperative_mood", [
    describe("use_imperative_mood", [
      describe("when the PR title is written in the imperative mood", [
        it("returns Ok", fn() {
          use_imperative_mood("Add brand new feature")
          |> expect.to_be_ok
        }),
      ]),
      describe("when the PR title contains a third-person singular verb", [
        it("returns an Error containing a violation", fn() {
          use_imperative_mood("Adds a brand new feature")
          |> expect.to_be_error
          |> expect.to_equal([Violation(span: #(0, string.length("Adds")))])
        }),
      ]),
      describe("when the PR title contains a past-tense verb", [
        it("returns an Error containing a violation", fn() {
          use_imperative_mood("Added a brand new feature")
          |> expect.to_be_error
          |> expect.to_equal([Violation(span: #(0, string.length("Added")))])
        }),
      ]),
      describe("when the PR title contains a present participle verb", [
        it("returns an Error containing a violation", fn() {
          use_imperative_mood("Adding a brand new feature")
          |> expect.to_be_error
          |> expect.to_equal([Violation(span: #(0, string.length("Adding")))])
        }),
      ]),
    ]),
  ])
}
