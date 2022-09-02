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
  'tweaks',
  'updates',
]);

export const isThirdPersonSingular = (verb: string) =>
  thirdPersonSingularVerbs.has(verb.toLowerCase());

export const isPastTense = (verb: string) => /(.+ed)$/.test(verb);

export const isPresentParticiple = (verb: string) => /((\w)*(ing))/.test(verb);

export const isBareInfinitive = (verb: string) =>
  !isThirdPersonSingular(verb) &&
  !isPastTense(verb) &&
  !isPresentParticiple(verb);
