import {
  UseImperativeMoodConfig,
  UseSentenceCaseConfig,
  NoTrailingPunctuationConfig,
  defaultUseImperativeMoodConfig,
  defaultUseSentenceCaseConfig,
  defaultNoTrailingPunctuationConfig,
  useImperativeMood,
  useSentenceCase,
  noTrailingPunctuation,
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
    if (options.imperativeMood !== 'off') {
      const ruleOptions = optionsOrDefaults(defaultUseImperativeMoodConfig)(
        options.imperativeMood
      );

      useImperativeMood({
        emit: () => emitLevelToHandler[ruleOptions.level](ruleOptions.message),
      })(ctx.prTitle);
    }

    if (options.sentenceCase !== 'off') {
      const ruleOptions = optionsOrDefaults(defaultUseSentenceCaseConfig)(
        options.sentenceCase
      );

      useSentenceCase({
        emit: () => emitLevelToHandler[ruleOptions.level](ruleOptions.message),
      })(ctx.prTitle);
    }

    if (options.noTrailingPunctuation !== 'off') {
      const ruleOptions = optionsOrDefaults(defaultNoTrailingPunctuationConfig)(
        options.noTrailingPunctuation
      );

      noTrailingPunctuation({
        emit: () => emitLevelToHandler[ruleOptions.level](ruleOptions.message),
      })(ctx.prTitle);
    }
  };
};
