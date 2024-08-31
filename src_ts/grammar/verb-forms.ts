const thirdPersonSingularVerbs = new Set([
  'adds',
  'amends',
  'applies',
  'boosts',
  'calculates',
  'captures',
  'changes',
  'cleans',
  'copies',
  'deletes',
  'deprecates',
  'documents',
  'duplicates',
  'empowers',
  'enhances',
  'expands',
  'explores',
  'facilitates',
  'fixes',
  'forces',
  'formalizes',
  'implements',
  'improves',
  'initializes',
  'integrates',
  'makes',
  'merges',
  'migrates',
  'modernizes',
  'modifies',
  'optimizes',
  'patches',
  'plugs',
  'presents',
  'refactors',
  'removes',
  'reshapes',
  'resolves',
  'reveals',
  'reverts',
  'revises',
  'secures',
  'simplifies',
  'standardizes',
  'stores',
  'streamlines',
  'supports',
  'tests',
  'transforms',
  'tries',
  'tweaks',
  'undoes',
  'unifies',
  'updates',
  'upgrades',
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
