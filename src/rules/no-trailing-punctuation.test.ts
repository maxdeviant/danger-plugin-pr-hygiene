import { noTrailingPunctuation } from './no-trailing-punctuation';

describe('noTrailingPunctuation', () => {
  const punctuationMarks = ['.', '!', '?', ',', ':', ';'];

  describe('when the PR title does not have any trailing punctuation', () => {
    it('does not a emit a message', () => {
      const emit = jest.fn();

      noTrailingPunctuation({ emit })('No trailing punctuation here');

      expect(emit).not.toHaveBeenCalled();
    });
  });

  describe.each(punctuationMarks)(
    'when the PR title ends with `%s`',
    punctuationMark => {
      it('emits a message', () => {
        const emit = jest.fn();

        noTrailingPunctuation({ emit })('Fix a nasty bug' + punctuationMark);

        expect(emit).toHaveBeenCalledTimes(1);
      });
    }
  );

  describe.each(punctuationMarks)(
    'when the PR title ends with multiple `%s`s',
    punctuationMark => {
      it('emits a message', () => {
        const emit = jest.fn();

        noTrailingPunctuation({ emit })(
          'Fix a nasty bug' + punctuationMark + punctuationMark
        );

        expect(emit).toHaveBeenCalledTimes(1);
      });
    }
  );
});
