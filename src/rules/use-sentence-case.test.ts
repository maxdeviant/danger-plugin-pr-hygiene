import { useSentenceCase } from './use-sentence-case';

describe('useSentenceCase', () => {
  const message = 'Violation';

  describe('when the PR title is written using sentence case', () => {
    it('does not emit a message', () => {
      const emit = jest.fn();

      useSentenceCase({ emit, message })('Add a shiny new feature');

      expect(emit).not.toHaveBeenCalled();
    });
  });

  describe('when the PR title starts with a lowercase letter', () => {
    it('emits a message', () => {
      const emit = jest.fn();

      useSentenceCase({ emit, message })('add a shiny new feature');

      expect(emit).toHaveBeenCalledTimes(1);
    });
  });
});
