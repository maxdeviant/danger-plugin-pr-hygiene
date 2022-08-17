import {
  isPastTense,
  isPresentParticiple,
  isThirdPersonSingular,
} from '../grammar';
import { EmitLevel } from '../types';

export interface UseImperativeMoodConfig {
  level: EmitLevel;
  message: string;
}

export const defaultUseImperativeMoodConfig: UseImperativeMoodConfig = {
  level: 'warn',
  message: 'Write PR titles using the imperative mood.',
};

export const useImperativeMood =
  ({ emit, message }: { emit: (message: string) => void; message: string }) =>
  (prTitle: string) => {
    const words = prTitle.split(' ');

    const thirdPersonSingularWords = words.filter(isThirdPersonSingular);
    const pastTenseWords = words.filter(isPastTense);
    const presentParticipleWords = words.filter(isPresentParticiple);

    if (
      thirdPersonSingularWords.length ||
      pastTenseWords.length ||
      presentParticipleWords.length
    ) {
      emit(message);
    }
  };
