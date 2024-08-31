import * as E from 'fp-ts/Either';
import { extractPrefix } from '../pr-title';
import { EmitLevel } from '../types';
import { Rule } from './rule';

export interface RequirePrefixConfig {
  level: EmitLevel;
  message: string;
}

export const defaultRequirePrefixConfig: RequirePrefixConfig = {
  level: 'warn',
  message: 'PR titles must have a prefix.',
};

export const requirePrefix: (prefixPattern: RegExp) => Rule =
  prefixPattern => prTitle => {
    const { prefix } = extractPrefix(prefixPattern)(prTitle);
    if (!prefix) {
      return E.left([{ span: [0, 0] }]);
    }

    return E.right(undefined);
  };
