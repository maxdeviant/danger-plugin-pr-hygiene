import { DangerDSLType } from 'danger';
import {
  defaultNoTrailingPunctuationConfig,
  defaultUseImperativeMoodConfig,
  noTrailingPunctuation,
  NoTrailingPunctuationConfig,
  useImperativeMood,
  UseImperativeMoodConfig,
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

export interface PrHygieneOptions {
  imperativeMood?: UseImperativeMoodConfig | 'off';
  noTrailingPunctuation?: NoTrailingPunctuationConfig | 'off';
}

export const prHygiene = ({
  imperativeMood = defaultUseImperativeMoodConfig,
  noTrailingPunctuation:
    noTrailingPunctuationConfig = defaultNoTrailingPunctuationConfig,
}: PrHygieneOptions) => {
  if (imperativeMood !== 'off') {
    useImperativeMood({
      emit: emitLevelToHandler[imperativeMood.level],
      message: imperativeMood.message,
    })(danger.github.pr.title);
  }

  if (noTrailingPunctuationConfig !== 'off') {
    noTrailingPunctuation({
      emit: emitLevelToHandler[noTrailingPunctuationConfig.level],
      message: noTrailingPunctuationConfig.message,
    });
  }
};
