import { DangerDSLType } from 'danger';
import { useImperativeMood } from './rules';

declare var danger: DangerDSLType;
declare function message(message: string): void;
declare function warn(message: string): void;
declare function fail(message: string): void;

export type EmitLevel = 'message' | 'warn' | 'fail';

const emitLevelToHandler: Record<EmitLevel, (message: string) => void> = {
  message,
  warn,
  fail,
};

export interface UseImperativeMoodConfig {
  level: EmitLevel;
  message: string;
}

const defaultUseImperativeMoodConfig: UseImperativeMoodConfig = {
  level: 'warn',
  message: 'Write PR titles using the imperative mood.',
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
