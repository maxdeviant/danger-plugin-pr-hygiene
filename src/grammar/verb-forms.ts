export const isPastTense = (word: string) => /(.+ed)/.test(word);

export const isPresentParticiple = (word: string) => /((\w)*(ing))/.test(word);
