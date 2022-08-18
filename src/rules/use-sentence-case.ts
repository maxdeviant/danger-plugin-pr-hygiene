import * as E from 'fp-ts/Either';
import { EmitLevel } from '../types';
import { Rule } from './rule';

export interface UseSentenceCaseConfig {
  level: EmitLevel;
  message: string;
}

export const defaultUseSentenceCaseConfig: UseSentenceCaseConfig = {
  level: 'warn',
  message: 'Write PR titles using sentence case.',
};

export const useSentenceCase: Rule = prTitle => {
  if (/^[a-z]/.test(prTitle)) {
    return E.left([{ span: [0, 1] }]);
  }

  return E.right(undefined);
};
