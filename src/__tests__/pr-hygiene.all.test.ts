import { makePrHygiene } from '../pr-hygiene';

const PASSING_PR_TITLES = [
  'Initial commit',
  'Initialize package',
  'Add functions to determine verb forms',
  'Add basic rule for imperative mood in PR titles',
  'Wire up the rule',
  'Make rule configurable',
  'Colocate rule config with the rule',
  'Add rule for no trailing punctuation in PR titles',
];

describe('prHygiene: All', () => {
  describe.each(PASSING_PR_TITLES)('given "%s"', prTitle => {
    it('does not emit anything', () => {
      const message = jest.fn();
      const warn = jest.fn();
      const fail = jest.fn();
      const markdown = jest.fn();

      const prHygiene = makePrHygiene({
        message,
        warn,
        fail,
        markdown,
        prTitle,
      });

      prHygiene();

      expect(message).not.toHaveBeenCalled();
      expect(warn).not.toHaveBeenCalled();
      expect(fail).not.toHaveBeenCalled();
    });
  });
});
