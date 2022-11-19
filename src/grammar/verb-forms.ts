const thirdPersonSingularVerbs = new Set([
  'adds',
  'amends',
  'applies',
  'changes',
  'cleans',
  'copies',
  'deletes',
  'duplicates',
  'fixes',
  'formalizes',
  'initializes',
  'migrates',
  'modifies',
  'patches',
  'plugs',
  'removes',
  'reverts',
  'standardizes',
  'stores',
  'tries',
  'tweaks',
  'undoes',
  'updates',
  'writes',
]);

export const isThirdPersonSingular = (verb: string) =>
  thirdPersonSingularVerbs.has(verb.toLowerCase());

export const isPastTense = (verb: string) => /(.+ed)$/.test(verb);

const presentParticipleExceptions = new Set(['bring']);

export const isPresentParticiple = (verb: string) =>
  /((\w)*(ing))$/.test(verb) && !presentParticipleExceptions.has(verb);

export const isBareInfinitive = (verb: string) =>
  !isThirdPersonSingular(verb) &&
  !isPastTense(verb) &&
  !isPresentParticiple(verb);
