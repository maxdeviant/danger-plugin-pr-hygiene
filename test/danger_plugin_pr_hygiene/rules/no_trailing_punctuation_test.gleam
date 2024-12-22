import danger_plugin_pr_hygiene/rule.{Violation}
import danger_plugin_pr_hygiene/rules/no_trailing_punctuation.{
  no_trailing_punctuation,
}
import gleam/list
import gleam/string
import startest.{describe, it}
import startest/expect

pub fn no_trailing_punctuation_tests() {
  let punctuation_marks = [".", "!", "?", ",", ":", ";"]

  describe("danger_plugin_pr_hygiene/rules/no_trailing_punctuation", [
    describe("no_trailing_punctuation", [
      describe("when the PR title does not have any trailing punctuation", [
        it("returns Ok", fn() {
          no_trailing_punctuation("No trailing punctuation here")
          |> expect.to_be_ok
        }),
      ]),
      ..punctuation_marks
      |> list.flat_map(fn(punctuation_mark) {
        [
          describe("when the PR title ends with `" <> punctuation_mark <> "`", [
            it("returns an Error containing a violation", fn() {
              let base_title = "Fix a nasty bug"

              no_trailing_punctuation(base_title <> punctuation_mark)
              |> expect.to_be_error
              |> expect.to_equal([
                Violation(span: #(
                  string.length(base_title),
                  string.length(base_title) + 1,
                )),
              ])
            }),
          ]),
          describe(
            "when the PR title ends with `"
              <> string.repeat(punctuation_mark, 3)
              <> "`",
            [
              it("returns an Error containing a violation", fn() {
                let base_title = "Implement a cool feature"

                no_trailing_punctuation(
                  base_title <> string.repeat(punctuation_mark, 3),
                )
                |> expect.to_be_error
                |> expect.to_equal([
                  Violation(span: #(
                    string.length(base_title),
                    string.length(base_title) + 3,
                  )),
                ])
              }),
            ],
          ),
        ]
      })
    ]),
  ])
}
