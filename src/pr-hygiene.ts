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

export interface PrHygieneContext {
  message: (message: string) => void;
  warn: (message: string) => void;
  fail: (message: string) => void;
  prTitle: string;
}

export type ConfigurationOrOff<T> = T | 'off';

export interface PrHygieneOptions {
  imperativeMood?: ConfigurationOrOff<UseImperativeMoodConfig>;
  sentenceCase?: ConfigurationOrOff<UseSentenceCaseConfig>;
  noTrailingPunctuation?: ConfigurationOrOff<NoTrailingPunctuationConfig>;
}

export const makePrHygiene = (ctx: PrHygieneContext) => {
  const emitLevelToHandler: Record<EmitLevel, (message: string) => void> = {
    message: ctx.message,
    warn: ctx.warn,
    fail: ctx.fail,
  };

  return ({
    imperativeMood = defaultUseImperativeMoodConfig,
    sentenceCase = defaultUseSentenceCaseConfig,
    noTrailingPunctuation:
      noTrailingPunctuationConfig = defaultNoTrailingPunctuationConfig,
  }: PrHygieneOptions = {}) => {
    if (imperativeMood !== 'off') {
      useImperativeMood({
        emit: emitLevelToHandler[imperativeMood.level],
        message: imperativeMood.message,
      })(ctx.prTitle);
    }

    if (sentenceCase !== 'off') {
      useSentenceCase({
        emit: emitLevelToHandler[sentenceCase.level],
        message: sentenceCase.message,
      })(ctx.prTitle);
    }

    if (noTrailingPunctuationConfig !== 'off') {
      noTrailingPunctuation({
        emit: emitLevelToHandler[noTrailingPunctuationConfig.level],
        message: noTrailingPunctuationConfig.message,
      })(ctx.prTitle);
    }
  };
};
