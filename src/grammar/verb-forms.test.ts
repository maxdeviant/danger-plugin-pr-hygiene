import { isPastTense, isPresentParticiple } from './verb-forms';

describe('Verb Forms', () => {
  describe('isPastTense', () => {
    it.each([
      'added',
      'changed',
      'edited',
      'updated',
      'deleted',
      'removed',
      'redirected',
    ])("'%s' is past tense", word => {
      expect(isPastTense(word)).toBe(true);
    });

    it.each([
      'add',
      'change',
      'edit',
      'update',
      'delete',
      'remove',
      'redirect',
    ])("'%s' is not past tense", word => {
      expect(isPastTense(word)).toBe(false);
    });
  });

  describe('isPresentParticiple', () => {
    it.each(['adding', 'changing', 'updating', 'deleting', 'removing'])(
      "'%s' is present participle",
      word => {
        expect(isPresentParticiple(word)).toBe(true);
      }
    );

    it.each([
      'add',
      'change',
      'update',
      'delete',
      'remove',
      'stringify',
      'bring',
    ])("'%s' is not present participle", word => {
      expect(isPresentParticiple(word)).toBe(false);
    });
  });
});
