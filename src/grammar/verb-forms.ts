const thirdPersonSingularVerbs = new Set([
  'adds',
  'amends',
  'changes',
  'deletes',
  'fixes',
  'modifies',
  'patches',
  'removes',
  'reverts',
  'updates',
]);

export const isThirdPersonSingular = (word: string) =>
  thirdPersonSingularVerbs.has(word.toLowerCase());

const pastTenseExceptions = new Set(['provided', 'shipped']);

export const isPastTense = (word: string) =>
  !pastTenseExceptions.has(word.toLowerCase()) && /(.+ed)/.test(word);

const presentParticipleExceptions = new Set(['trailing']);

export const isPresentParticiple = (word: string) =>
  !presentParticipleExceptions.has(word.toLowerCase()) &&
  /((\w)*(ing))/.test(word);
