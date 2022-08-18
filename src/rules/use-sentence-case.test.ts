import { useSentenceCase } from './use-sentence-case';

describe('useSentenceCase', () => {
  describe('when the PR title is written using sentence case', () => {
    it('returns an empty Right', () => {
      expect(useSentenceCase('Add a shiny new feature')).toEqualRight(
        undefined
      );
    });
  });

  describe('when the PR title starts with a lowercase letter', () => {
    it('returns a Left with a violation', () => {
      expect(useSentenceCase('add a shiny new feature')).toEqualLeft([
        'VIOLATION',
      ]);
    });
  });
});
