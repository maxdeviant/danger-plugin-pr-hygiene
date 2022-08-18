import { useImperativeMood } from './use-imperative-mood';

describe('useImperativeMood', () => {
  describe('when the PR title is written in the imperative mood', () => {
    it('returns an empty Right', () => {
      expect(useImperativeMood('Add brand new feature')).toEqualRight(
        undefined
      );
    });
  });

  describe('when the PR title contains a third-person singular verb', () => {
    it('returns a Left with a violation', () => {
      expect(useImperativeMood('Adds a brand new feature')).toEqualLeft([
        'VIOLATION',
      ]);
    });
  });

  describe('when the PR title contains a past-tense verb', () => {
    it('returns a Left with a violation', () => {
      expect(useImperativeMood('Added a brand new feature')).toEqualLeft([
        'VIOLATION',
      ]);
    });
  });

  describe('when the PR title contains a present participle verb', () => {
    it('returns a Left with a violation', () => {
      expect(useImperativeMood('Adding a brand new feature')).toEqualLeft([
        'VIOLATION',
      ]);
    });
  });
});
