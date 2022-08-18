export const extractPrefix = (prefixPattern: RegExp) => (prTitle: string) => {
  const matches = prefixPattern.exec(prTitle);
  if (!matches) {
    return { prefix: undefined, suffix: prTitle };
  }

  const [_matchedText, prefix, suffix] = matches;

  return { prefix, suffix: suffix?.trim() ?? '' };
};
