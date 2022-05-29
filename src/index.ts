export const removePunc = (text = '') => text.replace(/[^\w\s]/g, '');

export const removeSpaces = (text = '') => text.replace(/\s/g, '');

export const tallyLetters = (text = '') =>
  removeSpaces(removePunc(text))
    .toLowerCase()
    .split('')
    .reduce((tally: { [key: string]: number }, letter: string) => {
      tally[letter] = tally[letter] ? tally[letter]! + 1 : 1;
      return tally;
    }, {});

export default (text = '') => {
  const sortedLetterTallyEntries = Object.entries(tallyLetters(text)).sort(
    (a, b) => b[1] - a[1],
  );

  return (
    sortedLetterTallyEntries
      .filter((entry) => entry[1] === sortedLetterTallyEntries[0]![1])

      // Only care about the letters, not the count.
      .map((entry) => entry[0])
  );
};
