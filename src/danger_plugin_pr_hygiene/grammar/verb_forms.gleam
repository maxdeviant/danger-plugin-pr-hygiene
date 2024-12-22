import gleam/regex
import gleam/set.{type Set}
import gleam/string

pub fn third_person_singular_verbs() -> Set(String) {
  set.from_list([
    "adds", "amends", "applies", "boosts", "calculates", "captures", "changes",
    "cleans", "copies", "deletes", "deprecates", "documents", "duplicates",
    "empowers", "enhances", "expands", "explores", "facilitates", "fixes",
    "forces", "formalizes", "implements", "improves", "initializes",
    "integrates", "makes", "merges", "migrates", "modernizes", "modifies",
    "optimizes", "patches", "plugs", "presents", "refactors", "removes",
    "reshapes", "resolves", "reveals", "reverts", "revises", "secures",
    "simplifies", "standardizes", "stores", "streamlines", "supports", "tests",
    "transforms", "tries", "tweaks", "undoes", "unifies", "updates", "upgrades",
    "writes",
  ])
}

pub fn is_third_person_singular(verb: String) -> Bool {
  verb
  |> string.lowercase
  |> set.contains(third_person_singular_verbs(), _)
}

pub fn is_past_tense(verb: String) -> Bool {
  string.ends_with(verb, "ed")
}

pub fn present_participle_exceptions() -> Set(String) {
  set.from_list(["bring"])
}

pub fn is_present_participle(verb: String) -> Bool {
  let assert Ok(pattern) = regex.from_string("(\\w)*(ing)$")

  regex.check(pattern, verb)
  && !set.contains(present_participle_exceptions(), string.lowercase(verb))
}

pub fn is_bare_infinitive(verb: String) -> Bool {
  !is_third_person_singular(verb)
  && !is_past_tense(verb)
  && !is_present_participle(verb)
}
