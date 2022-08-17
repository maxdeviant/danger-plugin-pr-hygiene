import { makePrHygiene } from '../pr-hygiene';

const PASSING_PR_TITLES = ['Add feature X', 'Remove feature X'];

const FAILING_PR_TITLES = [
  'Adds feature X',
  'Adding feature Y',
  'Added feature Z',
  'Removes feature X',
  'Removing feature Y',
  'Removed feature Z',
];

describe('prHygiene: Imperative Mood', () => {
  describe('when enabled', () => {
    describe.each(PASSING_PR_TITLES)('given "%s"', prTitle => {
      it('does not emit anything', () => {
        const message = jest.fn();
        const warn = jest.fn();
        const fail = jest.fn();

        const prHygiene = makePrHygiene({
          message,
          warn,
          fail,
          prTitle,
        });

        prHygiene();

        expect(message).not.toHaveBeenCalled();
        expect(warn).not.toHaveBeenCalled();
        expect(fail).not.toHaveBeenCalled();
      });
    });

    describe.each(FAILING_PR_TITLES)('given "%s"', prTitle => {
      it('emits a message', () => {
        const message = jest.fn();
        const warn = jest.fn();
        const fail = jest.fn();

        const prHygiene = makePrHygiene({
          message,
          warn,
          fail,
          prTitle,
        });

        prHygiene();

        expect(message).not.toHaveBeenCalled();
        expect(warn).toHaveBeenCalledTimes(1);
        expect(fail).not.toHaveBeenCalled();
      });
    });
  });

  describe('when disabled', () => {
    describe.each(FAILING_PR_TITLES)('given "%s"', prTitle => {
      it('does not emit anything', () => {
        const message = jest.fn();
        const warn = jest.fn();
        const fail = jest.fn();

        const prHygiene = makePrHygiene({
          message,
          warn,
          fail,
          prTitle,
        });

        prHygiene({ imperativeMood: 'off' });

        expect(message).not.toHaveBeenCalled();
        expect(warn).not.toHaveBeenCalled();
        expect(fail).not.toHaveBeenCalled();
      });
    });
  });
});
