import { useImperativeMood } from './use-imperative-mood';

describe('useImperativeMood', () => {
  describe('when the PR title is written in the imperative mood', () => {
    it('does not emit a warning', () => {
      const warn = jest.fn();

      useImperativeMood({ warn })('Add brand new feature');

      expect(warn).not.toHaveBeenCalled();
    });
  });

  describe('when the PR title contains a third-person singular verb', () => {
    it('emits a warning', () => {
      const warn = jest.fn();

      useImperativeMood({ warn })('Adds a brand new feature');

      expect(warn).toHaveBeenCalledTimes(1);
    });
  });

  describe('when the PR title contains a past-tense verb', () => {
    it('emits a warning', () => {
      const warn = jest.fn();

      useImperativeMood({ warn })('Added a brand new feature');

      expect(warn).toHaveBeenCalledTimes(1);
    });
  });

  describe('when the PR title contains a present participle verb', () => {
    it('emits a warning', () => {
      const warn = jest.fn();

      useImperativeMood({ warn })('Adding a brand new feature');

      expect(warn).toHaveBeenCalledTimes(1);
    });
  });
});
