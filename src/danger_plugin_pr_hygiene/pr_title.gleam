import gleam/option.{type Option, None, Some}
import gleam/regex.{type Regex}

pub type PrTitle {
  PrTitle(prefix: Option(String), suffix: String)
}

pub fn parse(pr_title: String, prefix_pattern pattern: Regex) -> PrTitle {
  let parts = pr_title |> regex.split(with: pattern)

  case parts {
    [prefix, suffix] -> PrTitle(prefix: Some(prefix), suffix:)
    _ -> PrTitle(prefix: None, suffix: pr_title)
  }
}
