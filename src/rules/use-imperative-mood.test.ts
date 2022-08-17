import { useImperativeMood } from './use-imperative-mood';

describe('useImperativeMood', () => {
  const message = 'Violation';

  describe('when the PR title is written in the imperative mood', () => {
    it('does not emit a message', () => {
      const emit = jest.fn();

      useImperativeMood({ emit, message })('Add brand new feature');

      expect(emit).not.toHaveBeenCalled();
    });
  });

  describe('when the PR title contains a third-person singular verb', () => {
    it('emits a message', () => {
      const emit = jest.fn();

      useImperativeMood({ emit, message })('Adds a brand new feature');

      expect(emit).toHaveBeenCalledTimes(1);
    });
  });

  describe('when the PR title contains a past-tense verb', () => {
    it('emits a message', () => {
      const emit = jest.fn();

      useImperativeMood({ emit, message })('Added a brand new feature');

      expect(emit).toHaveBeenCalledTimes(1);
    });
  });

  describe('when the PR title contains a present participle verb', () => {
    it('emits a message', () => {
      const emit = jest.fn();

      useImperativeMood({ emit, message })('Adding a brand new feature');

      expect(emit).toHaveBeenCalledTimes(1);
    });
  });
});
