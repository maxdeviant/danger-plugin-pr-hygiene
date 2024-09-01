import danger_plugin_pr_hygiene/grammar/verb_forms.{
  is_past_tense, is_present_participle,
}
import gleam/list
import startest.{describe, it}
import startest/expect

pub fn is_past_tense_tests() {
  describe("danger_plugin_pr_hygiene/grammar/verb_forms", [
    describe(
      "is_past_tense",
      [
        [
          "added", "changed", "edited", "updated", "deleted", "removed",
          "redirected",
        ]
          |> list.map(fn(word) {
            it("'" <> word <> "' is past tense", fn() {
              is_past_tense(word)
              |> expect.to_be_true
            })
          }),
        ["add", "change", "edit", "update", "delete", "remove", "redirect"]
          |> list.map(fn(word) {
            it("'" <> word <> "' is not past tense", fn() {
              is_past_tense(word)
              |> expect.to_be_false
            })
          }),
      ]
        |> list.concat,
    ),
  ])
}

pub fn is_present_participle_tests() {
  describe("danger_plugin_pr_hygiene/grammar/verb_forms", [
    describe(
      "is_present_participle",
      [
        ["adding", "changing", "updating", "deleting", "removing"]
          |> list.map(fn(word) {
            it("'" <> word <> "' is present participle", fn() {
              is_present_participle(word)
              |> expect.to_be_true
            })
          }),
        [
          "add", "change", "update", "delete", "remove", "stringify", "bring",
          "Bring",
        ]
          |> list.map(fn(word) {
            it("'" <> word <> "' is not present participle", fn() {
              is_present_participle(word)
              |> expect.to_be_false
            })
          }),
      ]
        |> list.concat,
    ),
  ])
}
