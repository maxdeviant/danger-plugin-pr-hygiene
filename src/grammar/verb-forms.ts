export const isThirdPersonSingular = (word: string) =>
  ['adds', 'changes', 'updates', 'removes', 'deletes'].includes(
    word.toLowerCase()
  );

export const isPastTense = (word: string) => /(.+ed)/.test(word);

export const isPresentParticiple = (word: string) => /((\w)*(ing))/.test(word);
