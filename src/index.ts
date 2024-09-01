import { DangerDSLType } from "danger";
import {
  Config,
  ConfigurationOrOff$ as InternalConfigurationOrOff,
  default_options,
  make_pr_hygiene,
  Off,
  PrHygieneContext,
  PrHygieneOptions as InternalPrHygieneOptions,
  PrHygieneRules,
} from "../build/dev/javascript/danger_plugin_pr_hygiene/danger_plugin_pr_hygiene.mjs";
import {
  EmitLevel$,
  Fail,
  Message,
  Warn,
} from "../build/dev/javascript/danger_plugin_pr_hygiene/danger_plugin_pr_hygiene/emit_level.mjs";
import { NoTrailingPunctuationConfig as InternalNoTrainingPunctuationConfig } from "../build/dev/javascript/danger_plugin_pr_hygiene/danger_plugin_pr_hygiene/rules/no_trailing_punctuation.mjs";
import { RequirePrefixConfig as InternalRequirePrefixConfig } from "../build/dev/javascript/danger_plugin_pr_hygiene/danger_plugin_pr_hygiene/rules/require_prefix.mjs";
import { UseImperativeMoodConfig as InternalUseImperativeMoodConfig } from "../build/dev/javascript/danger_plugin_pr_hygiene/danger_plugin_pr_hygiene/rules/use_imperative_mood.mjs";
import { UseSentenceCaseConfig as InternalUseSentenceCaseConfig } from "../build/dev/javascript/danger_plugin_pr_hygiene/danger_plugin_pr_hygiene/rules/use_sentence_case.mjs";

declare var danger: DangerDSLType;
declare function message(message: string): undefined;
declare function warn(message: string): undefined;
declare function fail(message: string): undefined;
declare function markdown(message: string): undefined;

export type EmitLevel = "message" | "warn" | "fail";

export interface RequirePrefixConfig {
  level: EmitLevel;
  message: string;
}

export interface UseImperativeMoodConfig {
  level: EmitLevel;
  message: string;
}

export interface UseSentenceCaseConfig {
  level: EmitLevel;
  message: string;
}

export interface NoTrailingPunctuationConfig {
  level: EmitLevel;
  message: string;
}

export type ConfigurationOrOff<T> = T | "off";

export type PartialConfigurationOrOff<T> = ConfigurationOrOff<Partial<T>>;

export interface PrHygieneOptions {
  prefixPattern?: RegExp;
  rules?: {
    requirePrefix?: PartialConfigurationOrOff<RequirePrefixConfig>;
    useImperativeMood?: PartialConfigurationOrOff<UseImperativeMoodConfig>;
    useSentenceCase?: PartialConfigurationOrOff<UseSentenceCaseConfig>;
    noTrailingPunctuation?: PartialConfigurationOrOff<NoTrailingPunctuationConfig>;
  };
}

export function prHygiene(options: PrHygieneOptions = {}): void {
  const prHygiene = make_pr_hygiene(
    new PrHygieneContext(message, warn, fail, markdown, danger.github.pr.title),
  );

  const defaultOptions = default_options();

  prHygiene(
    new InternalPrHygieneOptions(
      options?.prefixPattern ?? defaultOptions.prefix_pattern,
      new PrHygieneRules(
        applyConfiguration(
          options?.rules?.requirePrefix,
          defaultOptions.rules.require_prefix,
          ({ level, message }, defaultConfig) =>
            new InternalRequirePrefixConfig(
              level ? toInternalEmitLevel(level) : defaultConfig.level,
              message ?? defaultConfig.message,
            ),
        ),
        applyConfiguration(
          options?.rules?.useImperativeMood,
          defaultOptions.rules.use_imperative_mood,
          ({ level, message }, defaultConfig) =>
            new InternalUseImperativeMoodConfig(
              level ? toInternalEmitLevel(level) : defaultConfig.level,
              message ?? defaultConfig.message,
            ),
        ),
        applyConfiguration(
          options?.rules?.useSentenceCase,
          defaultOptions.rules.use_sentence_case,
          ({ level, message }, defaultConfig) =>
            new InternalUseSentenceCaseConfig(
              level ? toInternalEmitLevel(level) : defaultConfig.level,
              message ?? defaultConfig.message,
            ),
        ),
        applyConfiguration(
          options?.rules?.noTrailingPunctuation,
          defaultOptions.rules.no_trailing_punctuation,
          ({ level, message }, defaultConfig) =>
            new InternalNoTrainingPunctuationConfig(
              level ? toInternalEmitLevel(level) : defaultConfig.level,
              message ?? defaultConfig.message,
            ),
        ),
      ),
    ),
  );
}

function toInternalEmitLevel(level: EmitLevel): EmitLevel$ {
  switch (level) {
    case "message":
      return new Message();
    case "warn":
      return new Warn();
    case "fail":
      return new Fail();
  }
}

function applyConfiguration<I, O>(
  overrides: PartialConfigurationOrOff<I> | undefined,
  defaultConfig: InternalConfigurationOrOff<O>,
  makeConfig: (overrides: Partial<I>, defaultConfig: O) => O,
): InternalConfigurationOrOff<O> {
  if (!overrides || defaultConfig instanceof Off) {
    return defaultConfig;
  }

  if (overrides === "off") {
    return new Off();
  }

  return new Config(makeConfig(overrides, defaultConfig[0]));
}
