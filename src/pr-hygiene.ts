import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import { extractPrefix } from './pr-title';
import {
  defaultNoTrailingPunctuationConfig,
  defaultRequirePrefixConfig,
  defaultUseImperativeMoodConfig,
  defaultUseSentenceCaseConfig,
  noTrailingPunctuation,
  NoTrailingPunctuationConfig,
  requirePrefix,
  RequirePrefixConfig,
  useImperativeMood,
  UseImperativeMoodConfig,
  useSentenceCase,
  UseSentenceCaseConfig,
} from './rules';
import { EmitLevel } from './types';

const optionsOrDefaults =
  <T>(defaults: T) =>
  (options: Partial<T> | undefined) => ({
    ...defaults,
    ...options,
  });

export interface PrHygieneContext {
  message: (message: string) => void;
  warn: (message: string) => void;
  fail: (message: string) => void;
  prTitle: string;
}

export type ConfigurationOrOff<T> = T | 'off';

export type PartialConfigurationOrOff<T> = ConfigurationOrOff<Partial<T>>;

export interface PrHygieneOptions {
  prefixPattern?: RegExp;
  rules?: {
    requirePrefix?: PartialConfigurationOrOff<RequirePrefixConfig>;
    imperativeMood?: PartialConfigurationOrOff<UseImperativeMoodConfig>;
    sentenceCase?: PartialConfigurationOrOff<UseSentenceCaseConfig>;
    noTrailingPunctuation?: PartialConfigurationOrOff<NoTrailingPunctuationConfig>;
  };
}

export const makePrHygiene = (ctx: PrHygieneContext) => {
  const emitLevelToHandler: Record<EmitLevel, (message: string) => void> = {
    message: ctx.message,
    warn: ctx.warn,
    fail: ctx.fail,
  };

  return (options: PrHygieneOptions = {}) => {
    const { rules = {} } = options;

    const prefixPattern = options.prefixPattern ?? /([a-z\d\(\)]+):(.*)/;

    const { suffix } = extractPrefix(prefixPattern)(ctx.prTitle);

    if (!rules.requirePrefix) {
      rules.requirePrefix = 'off';
    }

    if (rules.requirePrefix !== 'off') {
      const ruleOptions = optionsOrDefaults(defaultRequirePrefixConfig)(
        rules.requirePrefix
      );

      pipe(
        requirePrefix(prefixPattern)(ctx.prTitle),
        E.mapLeft(violations => {
          for (const _violation of violations) {
            emitLevelToHandler[ruleOptions.level](ruleOptions.message);
          }
        })
      );
    }

    if (rules.imperativeMood !== 'off') {
      const ruleOptions = optionsOrDefaults(defaultUseImperativeMoodConfig)(
        rules.imperativeMood
      );

      pipe(
        useImperativeMood(suffix),
        E.mapLeft(violations => {
          for (const _violation of violations) {
            emitLevelToHandler[ruleOptions.level](ruleOptions.message);
          }
        })
      );
    }

    if (rules.sentenceCase !== 'off') {
      const ruleOptions = optionsOrDefaults(defaultUseSentenceCaseConfig)(
        rules.sentenceCase
      );

      pipe(
        useSentenceCase(suffix),
        E.mapLeft(violations => {
          for (const _violation of violations) {
            emitLevelToHandler[ruleOptions.level](ruleOptions.message);
          }
        })
      );
    }

    if (rules.noTrailingPunctuation !== 'off') {
      const ruleOptions = optionsOrDefaults(defaultNoTrailingPunctuationConfig)(
        rules.noTrailingPunctuation
      );

      pipe(
        noTrailingPunctuation(suffix),
        E.mapLeft(violations => {
          for (const _violation of violations) {
            emitLevelToHandler[ruleOptions.level](ruleOptions.message);
          }
        })
      );
    }
  };
};
