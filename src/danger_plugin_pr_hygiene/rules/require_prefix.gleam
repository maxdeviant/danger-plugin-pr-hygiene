// import * as E from 'fp-ts/Either';
// import { extractPrefix } from '../pr-title';
// import { EmitLevel } from '../types';
// import { Rule } from './rule';

// export interface RequirePrefixConfig {
//   level: EmitLevel;
//   message: string;
// }

// export const defaultRequirePrefixConfig: RequirePrefixConfig = {
//   level: 'warn',
//   message: 'PR titles must have a prefix.',
// };

// export const requirePrefix: (prefixPattern: RegExp) => Rule =
//   prefixPattern => prTitle => {
//     const { prefix } = extractPrefix(prefixPattern)(prTitle);
//     if (!prefix) {
//       return E.left([{ span: [0, 0] }]);
//     }

//     return E.right(undefined);
//   };

import danger_plugin_pr_hygiene/emit_level.{type EmitLevel}
import danger_plugin_pr_hygiene/pr_title.{PrTitle}
import danger_plugin_pr_hygiene/rule.{type Violation, Violation}
import gleam/option.{None, Some}
import gleam/regex.{type Regex}

pub type RequirePrefixConfig {
  RequirePrefixConfig(level: EmitLevel, message: String)
}

pub fn default_config() -> RequirePrefixConfig {
  RequirePrefixConfig(
    level: emit_level.Warn,
    message: "PR titles must have a prefix.",
  )
}

pub fn require_prefix(
  prefix_pattern: Regex,
  pr_title: String,
) -> Result(Nil, List(Violation)) {
  let PrTitle(prefix:, ..) = pr_title.parse(pr_title, prefix_pattern)

  case prefix {
    None -> Error([Violation(span: #(0, 0))])
    Some(_) -> Ok(Nil)
  }
}
