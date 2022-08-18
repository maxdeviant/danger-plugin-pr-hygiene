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
  const matches = /[.!?,:;]+$/.exec(prTitle);
  if (matches?.[0]) {
    const [match] = matches;

    return E.left([{ span: [matches.index, matches.index + match.length] }]);
  }

  return E.right(undefined);
};
