import { EmitLevel } from '../types';

export interface NoTrailingPunctuationConfig {
  level: EmitLevel;
  message: string;
}

export const defaultNoTrailingPunctuationConfig: NoTrailingPunctuationConfig = {
  level: 'warn',
  message: 'Do not end PR titles with punctuation.',
};

export const noTrailingPunctuation =
  ({ emit, message }: { emit: (message: string) => void; message: string }) =>
  (prTitle: string) => {
    if (/[.!?,:;]+$/.test(prTitle)) {
      emit(message);
    }
  };
