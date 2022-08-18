import { noTrailingPunctuation } from './no-trailing-punctuation';

describe('noTrailingPunctuation', () => {
  const punctuationMarks = ['.', '!', '?', ',', ':', ';'];

  describe('when the PR title does not have any trailing punctuation', () => {
    it('returns an empty Right', () => {
      expect(
        noTrailingPunctuation('No trailing punctuation here')
      ).toEqualRight(undefined);
    });
  });

  describe.each(punctuationMarks)(
    'when the PR title ends with `%s`',
    punctuationMark => {
      it('returns a Left containing a violation', () => {
        expect(
          noTrailingPunctuation('Fix a nasty bug' + punctuationMark)
        ).toEqualLeft(['VIOLATION']);
      });
    }
  );

  describe.each(punctuationMarks)(
    'when the PR title ends with multiple `%s`s',
    punctuationMark => {
      it('returns a Left containing a violation', () => {
        expect(
          noTrailingPunctuation(
            'Fix a nasty bug' + punctuationMark + punctuationMark
          )
        ).toEqualLeft(['VIOLATION']);
      });
    }
  );
});
