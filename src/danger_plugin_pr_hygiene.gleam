import danger_plugin_pr_hygiene/emit_level.{type EmitLevel}
import danger_plugin_pr_hygiene/rule.{type Violation}
import danger_plugin_pr_hygiene/rules/no_trailing_punctuation.{
  type NoTrailingPunctuationConfig, no_trailing_punctuation,
}
import danger_plugin_pr_hygiene/rules/use_sentence_case.{
  type UseSentenceCaseConfig, use_sentence_case,
}
import gleam/io
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/result
import gleam/string

pub type PrHygieneContext {
  PrHygieneContext(
    message: fn(String) -> Nil,
    warn: fn(String) -> Nil,
    fail: fn(String) -> Nil,
    markdown: fn(String) -> Nil,
    pr_title: String,
  )
}

pub type ConfigurationOrOff(config) {
  Config(config)
  Off
}

pub type PrHygieneOptions {
  PrHygieneOptions(rules: PrHygieneRules)
}

pub type PrHygieneRules {
  PrHygieneRules(
    use_sentence_case: ConfigurationOrOff(UseSentenceCaseConfig),
    no_trailing_punctuation: ConfigurationOrOff(NoTrailingPunctuationConfig),
  )
}

pub fn make_pr_hygiene(ctx: PrHygieneContext) -> fn(PrHygieneOptions) -> Nil {
  let emit_at_level = fn(level: EmitLevel, message: String) -> Nil {
    case level {
      emit_level.Message -> ctx.message(message)
      emit_level.Warn -> ctx.warn(message)
      emit_level.Fail -> ctx.fail(message)
    }
  }

  fn(options: PrHygieneOptions) {
    let rules = options.rules

    // TODO: Extract PR prefix and suffix.
    let suffix = ctx.pr_title
    let parsed_pr_title = ParsedPrTitle(prefix: None, suffix:)

    let rules_to_process =
      [
        case rules.use_sentence_case {
          Config(config) -> {
            Ok(fn() {
              use_sentence_case(suffix)
              |> result.map_error(
                report_violations(fn(violation) {
                  let message =
                    render_violation(RenderViolationParams(
                      parsed_pr_title:,
                      pr_title: ctx.pr_title,
                      violation:,
                      message: config.message,
                    ))

                  emit_at_level(config.level, message)
                }),
              )
            })
          }
          Off -> Error(Nil)
        },
        case rules.no_trailing_punctuation {
          Config(config) -> {
            Ok(fn() {
              no_trailing_punctuation(suffix)
              |> result.map_error(
                report_violations(fn(violation) {
                  let message =
                    render_violation(RenderViolationParams(
                      parsed_pr_title:,
                      pr_title: ctx.pr_title,
                      violation:,
                      message: config.message,
                    ))

                  emit_at_level(config.level, message)
                }),
              )
            })
          }
          Off -> Error(Nil)
        },
      ]
      |> list.filter_map(fn(x) { x })

    let total_violations =
      rules_to_process
      |> list.fold(0, fn(acc, rule) {
        acc
        + case rule() {
          Ok(Nil) -> 0
          Error(violation_count) -> violation_count
        }
      })

    io.debug(total_violations)

    Nil
  }
}

type ParsedPrTitle {
  ParsedPrTitle(prefix: Option(String), suffix: String)
}

type RenderViolationParams {
  RenderViolationParams(
    parsed_pr_title: ParsedPrTitle,
    pr_title: String,
    violation: Violation,
    message: String,
  )
}

fn render_violation(params: RenderViolationParams) -> String {
  let RenderViolationParams(
    parsed_pr_title: ParsedPrTitle(
      prefix:,
      ..,
    ),
    pr_title:,
    violation:,
    message:,
  ) = params

  let #(start, end) = violation.span

  let indicator =
    "^"
    |> string.repeat(end - start)
    |> string.pad_left(
      to: case prefix {
        Some(prefix) -> string.length(prefix) + 2
        None -> 0
      }
        + end,
      with: " ",
    )

  // Start with a leading newline to prevent the codeblock from getting indented.
  "\n```\n" <> pr_title <> "\n" <> indicator <> "\n```\n" <> message
}

fn report_violations(
  emit_violation: fn(Violation) -> Nil,
) -> fn(List(Violation)) -> Int {
  fn(violations) {
    violations |> list.each(emit_violation)

    list.length(violations)
  }
}

pub fn main() {
  let pr_hygiene =
    make_pr_hygiene(PrHygieneContext(
      message: io.println,
      warn: io.println,
      fail: io.println,
      markdown: io.println,
      pr_title: "bad PR title.",
    ))

  pr_hygiene(
    PrHygieneOptions(rules: PrHygieneRules(
      use_sentence_case: Config(use_sentence_case.default_config()),
      no_trailing_punctuation: Config(no_trailing_punctuation.default_config()),
    )),
  )
}
