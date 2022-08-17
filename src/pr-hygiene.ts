import { DangerDSLType } from 'danger';
import {
  defaultUseImperativeMoodConfig,
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
}

export const prHygiene = ({
  imperativeMood = defaultUseImperativeMoodConfig,
}: PrHygieneOptions) => {
  if (imperativeMood !== 'off') {
    useImperativeMood({
      emit: emitLevelToHandler[imperativeMood.level],
      message: imperativeMood.message,
    })(danger.github.pr.title);
  }
};
