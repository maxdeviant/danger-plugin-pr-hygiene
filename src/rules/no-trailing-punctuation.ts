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

export const noTrailingPunctuation: Rule = ctx => prTitle => {
  if (/[.!?,:;]+$/.test(prTitle)) {
    ctx.emit();
  }
};
