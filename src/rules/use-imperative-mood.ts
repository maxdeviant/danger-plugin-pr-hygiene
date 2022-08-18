import { isBareInfinitive } from '../grammar';
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
  const indexedWords = words.map((word, index) => ({ word, index }));

  for (const { word, index } of indexedWords) {
    if (!isBareInfinitive(word)) {
      // If the PR title starts with a word that is not in its bare infinitive
      // then we can infer that it is a PR title along the lines of "Adds X",
      // which is not in the imperative mood.
      if (index === 0) {
        ctx.emit();
      }
    }
  }
};
