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

export const useSentenceCase: Rule = ctx => prTitle => {
  if (!isCapitalized(prTitle)) {
    ctx.emit();
  }
};
