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

const isCapitalized = (value: string) => /^[A-Z]/.test(value);

export const useSentenceCase: Rule = prTitle => {
  if (!isCapitalized(prTitle)) {
    return E.left(['VIOLATION']);
  }

  return E.right(undefined);
};
