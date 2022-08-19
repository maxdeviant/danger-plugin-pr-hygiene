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
  Violation,
} from './rules';
import { EmitLevel } from './types';

interface RenderViolationParams {
  parsedPrTitle: {
    prefix: string | undefined;
    suffix: string;
  };
  prTitle: string;
  violation: Violation;
  message: string;
}

const renderViolation = ({
  parsedPrTitle: { prefix },
  prTitle,
  violation,
  message,
}: RenderViolationParams) => {
  const [start, end] = violation.span;

  const indicator =
    '^'.repeat(end - start).padStart((prefix ? prefix.length + 2 : 0) + end) +
    ' ' +
    message;

  return '```\n' + prTitle + '\n' + indicator + '\n```';
};

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
    useImperativeMood?: PartialConfigurationOrOff<UseImperativeMoodConfig>;
    useSentenceCase?: PartialConfigurationOrOff<UseSentenceCaseConfig>;
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

    const { prefix, suffix } = extractPrefix(prefixPattern)(ctx.prTitle);

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
          for (const violation of violations) {
            const message = renderViolation({
              parsedPrTitle: { prefix, suffix },
              prTitle: ctx.prTitle,
              violation,
              message: ruleOptions.message,
            });

            emitLevelToHandler[ruleOptions.level](message);
          }
        })
      );
    }

    if (rules.useImperativeMood !== 'off') {
      const ruleOptions = optionsOrDefaults(defaultUseImperativeMoodConfig)(
        rules.useImperativeMood
      );

      pipe(
        useImperativeMood(suffix),
        E.mapLeft(violations => {
          for (const violation of violations) {
            const message = renderViolation({
              parsedPrTitle: { prefix, suffix },
              prTitle: ctx.prTitle,
              violation,
              message: ruleOptions.message,
            });

            emitLevelToHandler[ruleOptions.level](message);
          }
        })
      );
    }

    if (rules.useSentenceCase !== 'off') {
      const ruleOptions = optionsOrDefaults(defaultUseSentenceCaseConfig)(
        rules.useSentenceCase
      );

      pipe(
        useSentenceCase(suffix),
        E.mapLeft(violations => {
          for (const violation of violations) {
            const message = renderViolation({
              parsedPrTitle: { prefix, suffix },
              prTitle: ctx.prTitle,
              violation,
              message: ruleOptions.message,
            });

            emitLevelToHandler[ruleOptions.level](message);
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
          for (const violation of violations) {
            const message = renderViolation({
              parsedPrTitle: { prefix, suffix },
              prTitle: ctx.prTitle,
              violation,
              message: ruleOptions.message,
            });

            emitLevelToHandler[ruleOptions.level](message);
          }
        })
      );
    }
  };
};
