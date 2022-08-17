import {
  isPastTense,
  isPresentParticiple,
  isThirdPersonSingular,
} from '../grammar';
import { EmitLevel } from '../types';
import { Rule } from './rule';

export interface UseImperativeMoodConfig {
  level: EmitLevel;
  message: string;
}

export const defaultUseImperativeMoodConfig: UseImperativeMoodConfig = {
  level: 'warn',
  message: 'Write PR titles using the imperative mood.',
};

export const useImperativeMood: Rule = ctx => prTitle => {
  const words = prTitle.split(' ');

  const thirdPersonSingularWords = words.filter(isThirdPersonSingular);
  const pastTenseWords = words.filter(isPastTense);
  const presentParticipleWords = words.filter(isPresentParticiple);

  if (
    thirdPersonSingularWords.length ||
    pastTenseWords.length ||
    presentParticipleWords.length
  ) {
    ctx.emit();
  }
};
