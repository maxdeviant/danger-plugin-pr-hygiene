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
  requirePrefix?: PartialConfigurationOrOff<RequirePrefixConfig>;
  imperativeMood?: PartialConfigurationOrOff<UseImperativeMoodConfig>;
  sentenceCase?: PartialConfigurationOrOff<UseSentenceCaseConfig>;
  noTrailingPunctuation?: PartialConfigurationOrOff<NoTrailingPunctuationConfig>;
}

export const makePrHygiene = (ctx: PrHygieneContext) => {
  const emitLevelToHandler: Record<EmitLevel, (message: string) => void> = {
    message: ctx.message,
    warn: ctx.warn,
    fail: ctx.fail,
  };

  return (options: PrHygieneOptions = {}) => {
    const prefixPattern = options.prefixPattern ?? /([a-z\d\(\)]+):(.*)/;

    const { suffix } = extractPrefix(prefixPattern)(ctx.prTitle);

    if (!options.requirePrefix) {
      options.requirePrefix = 'off';
    }

    if (options.requirePrefix !== 'off') {
      const ruleOptions = optionsOrDefaults(defaultRequirePrefixConfig)(
        options.requirePrefix
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

    if (options.imperativeMood !== 'off') {
      const ruleOptions = optionsOrDefaults(defaultUseImperativeMoodConfig)(
        options.imperativeMood
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

    if (options.sentenceCase !== 'off') {
      const ruleOptions = optionsOrDefaults(defaultUseSentenceCaseConfig)(
        options.sentenceCase
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

    if (options.noTrailingPunctuation !== 'off') {
      const ruleOptions = optionsOrDefaults(defaultNoTrailingPunctuationConfig)(
        options.noTrailingPunctuation
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
