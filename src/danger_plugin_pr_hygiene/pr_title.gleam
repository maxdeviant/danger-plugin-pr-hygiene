import gleam/option.{type Option, None, Some}
import gleam/regex.{type Regex}
import gleam/string

pub type PrTitle {
  PrTitle(prefix: Option(String), suffix: String)
}

pub fn parse(pr_title: String, prefix_pattern pattern: Regex) -> PrTitle {
  let matches = pr_title |> regex.scan(with: pattern)

  case matches {
    [match] ->
      case match.submatches {
        [Some(prefix), Some(suffix)] ->
          PrTitle(prefix: Some(prefix), suffix: suffix |> string.trim)
        _ -> PrTitle(prefix: None, suffix: pr_title)
      }
    _ -> PrTitle(prefix: None, suffix: pr_title)
  }
}
