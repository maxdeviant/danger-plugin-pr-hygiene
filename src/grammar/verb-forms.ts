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

export const isPastTense = (word: string) => /(.+ed)/.test(word);

const presentParticipleExceptions = new Set(['trailing']);

export const isPresentParticiple = (word: string) =>
  !presentParticipleExceptions.has(word) && /((\w)*(ing))/.test(word);
