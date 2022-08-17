import { DangerDSLType } from 'danger';
import {
  defaultNoTrailingPunctuationConfig,
  defaultUseImperativeMoodConfig,
  defaultUseSentenceCaseConfig,
  noTrailingPunctuation,
  NoTrailingPunctuationConfig,
  useImperativeMood,
  UseImperativeMoodConfig,
  useSentenceCase,
  UseSentenceCaseConfig,
} from './rules';
import { EmitLevel } from './types';

declare var danger: DangerDSLType;
declare function message(message: string): void;
declare function warn(message: string): void;
declare function fail(message: string): void;

const emitLevelToHandler: Record<EmitLevel, (message: string) => void> = {
  message,
  warn,
  fail,
};

export type ConfigurationOrOff<T> = T | 'off';

export interface PrHygieneOptions {
  imperativeMood?: ConfigurationOrOff<UseImperativeMoodConfig>;
  sentenceCase?: ConfigurationOrOff<UseSentenceCaseConfig>;
  noTrailingPunctuation?: ConfigurationOrOff<NoTrailingPunctuationConfig>;
}

export const prHygiene = ({
  imperativeMood = defaultUseImperativeMoodConfig,
  sentenceCase = defaultUseSentenceCaseConfig,
  noTrailingPunctuation:
    noTrailingPunctuationConfig = defaultNoTrailingPunctuationConfig,
}: PrHygieneOptions = {}) => {
  if (imperativeMood !== 'off') {
    useImperativeMood({
      emit: emitLevelToHandler[imperativeMood.level],
      message: imperativeMood.message,
    })(danger.github.pr.title);
  }

  if (sentenceCase !== 'off') {
    useSentenceCase({
      emit: emitLevelToHandler[sentenceCase.level],
      message: sentenceCase.message,
    })(danger.github.pr.title);
  }

  if (noTrailingPunctuationConfig !== 'off') {
    noTrailingPunctuation({
      emit: emitLevelToHandler[noTrailingPunctuationConfig.level],
      message: noTrailingPunctuationConfig.message,
    })(danger.github.pr.title);
  }
};
