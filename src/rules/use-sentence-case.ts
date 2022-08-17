import { EmitLevel } from '../types';

export interface UseSentenceCaseConfig {
  level: EmitLevel;
  message: string;
}

export const defaultUseSentenceCaseConfig: UseSentenceCaseConfig = {
  level: 'warn',
  message: 'Write PR titles using sentence case.',
};

const isCapitalized = (value: string) => /^[A-Z]/.test(value);

export const useSentenceCase =
  ({ emit, message }: { emit: (message: string) => void; message: string }) =>
  (prTitle: string) => {
    if (!isCapitalized(prTitle)) {
      emit(message);
    }
  };
