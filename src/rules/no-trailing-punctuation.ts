import * as E from 'fp-ts/Either';
import { EmitLevel } from '../types';
import { Rule } from './rule';

export interface NoTrailingPunctuationConfig {
  level: EmitLevel;
  message: string;
}

export const defaultNoTrailingPunctuationConfig: NoTrailingPunctuationConfig = {
  level: 'warn',
  message: 'Do not end PR titles with punctuation.',
};

export const noTrailingPunctuation: Rule = prTitle => {
  if (/[.!?,:;]+$/.test(prTitle)) {
    return E.left(['VIOLATION']);
  }

  return E.right(undefined);
};
