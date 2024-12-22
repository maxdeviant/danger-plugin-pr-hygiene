import danger_plugin_pr_hygiene/emit_level.{type EmitLevel}
import danger_plugin_pr_hygiene/pr_title.{type PrTitle, PrTitle}
import danger_plugin_pr_hygiene/rule.{type Violation}
import danger_plugin_pr_hygiene/rules/no_trailing_punctuation.{
  type NoTrailingPunctuationConfig, no_trailing_punctuation,
}
import danger_plugin_pr_hygiene/rules/require_prefix.{
  type RequirePrefixConfig, require_prefix,
}
import danger_plugin_pr_hygiene/rules/use_imperative_mood.{
  type UseImperativeMoodConfig, use_imperative_mood,
}
import danger_plugin_pr_hygiene/rules/use_sentence_case.{
  type UseSentenceCaseConfig, use_sentence_case,
}
import gleam/list
import gleam/option.{None, Some}
import gleam/regex.{type Regex}
import gleam/result
import gleam/string
import gleam/uri

const package_version = "0.5.0"

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
  PrHygieneOptions(prefix_pattern: Regex, rules: PrHygieneRules)
}

pub fn default_options() -> PrHygieneOptions {
  let assert Ok(prefix_pattern) = regex.from_string("^([a-z\\d\\(\\)]+):(.*)")

  PrHygieneOptions(
    prefix_pattern:,
    rules: PrHygieneRules(
      require_prefix: Off,
      use_imperative_mood: Config(use_imperative_mood.default_config()),
      use_sentence_case: Config(use_sentence_case.default_config()),
      no_trailing_punctuation: Config(no_trailing_punctuation.default_config()),
    ),
  )
}

pub type PrHygieneRules {
  PrHygieneRules(
    require_prefix: ConfigurationOrOff(RequirePrefixConfig),
    use_imperative_mood: ConfigurationOrOff(UseImperativeMoodConfig),
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
    let PrHygieneOptions(prefix_pattern:, rules:) = options

    let parsed_pr_title = ctx.pr_title |> pr_title.parse(prefix_pattern)
    let PrTitle(suffix:, ..) = parsed_pr_title

    let rules_to_process =
      [
        case rules.require_prefix {
          Config(config) -> {
            Ok(fn() {
              require_prefix(prefix_pattern, ctx.pr_title)
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
        case rules.use_imperative_mood {
          Config(config) -> {
            Ok(fn() {
              use_imperative_mood(suffix)
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

    let has_any_violations = total_violations > 0
    case has_any_violations {
      True -> {
        let feedback_link = generate_feedback_link()

        ctx.markdown(
          "Have feedback on this plugin? [Let's hear it!]("
          <> feedback_link
          <> ")",
        )
      }
      False -> Nil
    }
  }
}

type RenderViolationParams {
  RenderViolationParams(
    parsed_pr_title: PrTitle,
    pr_title: String,
    violation: Violation,
    message: String,
  )
}

fn render_violation(params: RenderViolationParams) -> String {
  let RenderViolationParams(
    parsed_pr_title: PrTitle(
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

fn generate_feedback_link() -> String {
  let query_string =
    [
      #("template", "feedback.yaml"),
      #("title", "[Feedback]: "),
      #("labels", "feedback"),
      #("asignees", "maxdeviant"),
      #("version", package_version),
    ]
    |> uri.query_to_string

  "https://github.com/maxdeviant/danger-plugin-pr-hygiene/issues/new?"
  <> query_string
}
