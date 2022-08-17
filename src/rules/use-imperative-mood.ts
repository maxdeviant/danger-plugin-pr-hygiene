import {
  isPastTense,
  isPresentParticiple,
  isThirdPersonSingular,
} from '../grammar';

export const useImperativeMood =
  ({ warn }: { warn: (message: string) => void }) =>
  (prTitle: string) => {
    const words = prTitle.split(' ');

    const thirdPersonSingularWords = words.filter(isThirdPersonSingular);
    const pastTenseWords = words.filter(isPastTense);
    const presentParticipleWords = words.filter(isPresentParticiple);

    if (
      thirdPersonSingularWords.length ||
      pastTenseWords.length ||
      presentParticipleWords.length
    ) {
      warn('Write PR titles using the imperative mood.');
    }
  };
