import { makePrHygiene } from '../pr-hygiene';

const PASSING_PR_TITLES = [
  'api: Add a new endpoint',
  'feat: Allow provided config object to extend other configs',
  'feat(lang): Add Polish language',
];

const FAILING_PR_TITLES = [
  'Add a new endpoint',
  'Allow provided config object to extend other configs',
  'Add Polish language',
];

describe('prHygiene: Require Prefix', () => {
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

        prHygiene({ requirePrefix: {} });

        expect(message).not.toHaveBeenCalled();
        expect(warn).not.toHaveBeenCalled();
        expect(fail).not.toHaveBeenCalled();
      });
    });
  });

  describe.each(FAILING_PR_TITLES)('given "%s"', prTitle => {
    describe('with the `level` set to `message`', () => {
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

        prHygiene({ requirePrefix: { level: 'message' } });

        expect(message).toHaveBeenCalledTimes(1);
        expect(warn).not.toHaveBeenCalled();
        expect(fail).not.toHaveBeenCalled();
      });
    });

    describe('with the `level` set to `warn`', () => {
      it('emits a warning', () => {
        const message = jest.fn();
        const warn = jest.fn();
        const fail = jest.fn();

        const prHygiene = makePrHygiene({
          message,
          warn,
          fail,
          prTitle,
        });

        prHygiene({ requirePrefix: { level: 'warn' } });

        expect(message).not.toHaveBeenCalled();
        expect(warn).toHaveBeenCalledTimes(1);
        expect(fail).not.toHaveBeenCalled();
      });
    });

    describe('with the `level` set to `fail`', () => {
      it('emits a failure', () => {
        const message = jest.fn();
        const warn = jest.fn();
        const fail = jest.fn();

        const prHygiene = makePrHygiene({
          message,
          warn,
          fail,
          prTitle,
        });

        prHygiene({ requirePrefix: { level: 'fail' } });

        expect(message).not.toHaveBeenCalled();
        expect(warn).not.toHaveBeenCalled();
        expect(fail).toHaveBeenCalledTimes(1);
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

        prHygiene({ requirePrefix: 'off' });

        expect(message).not.toHaveBeenCalled();
        expect(warn).not.toHaveBeenCalled();
        expect(fail).not.toHaveBeenCalled();
      });
    });
  });
});
