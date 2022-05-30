// A shift of 1 means no change (off by one)
export const decode = (encoded = '', shift: number) =>
  encoded
    .split('')
    .map((char) => {
      if (!char.match(/[a-zA-Z]/)) return char;
      let decodedCharCode = char.charCodeAt(0) - shift + 1;

      // TODO: Decode mixed cases
      if (decodedCharCode < 97) {
        decodedCharCode = 122 - (97 - decodedCharCode) + 1;
      }

      return String.fromCharCode(decodedCharCode);
    })
    .join('');

export const encode = (text = '', shift = 4) =>
  text
    .split('')
    .map((char) => {
      if (!char.match(/[a-zA-Z]/)) return char;

      const shiftedCode = char.charCodeAt(0) + shift - 1;

      // TODO: Encode mixed cases
      // wrap around the alphabet
      if (shiftedCode > 122) {
        // At a shift of 22, the letter 'f' (shifted to 123) wraps to 'a' (97)
        return String.fromCharCode((shiftedCode % 122) + 96);
      }

      return String.fromCharCode(shiftedCode);
    })
    .join('');

export const getMostCommonLetters = (text = '') => {
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

export const guessWithFrequencyAnalysis = (encoded: string) => {
  // The most common letter in the English language is 'e'.
  // It's character code is 101.

  // TODO: Implement this function to send out multiple guesses for ties.
  const mostCommonLetterCode = getMostCommonLetters(encoded)
    .filter((letter) => letter !== 'e')[0]
    ?.charCodeAt(0);

  console.log(String.fromCharCode(mostCommonLetterCode!));

  if (!mostCommonLetterCode) return null;

  return decode(encoded, mostCommonLetterCode - 101 + 1);
};

export const removePunc = (text = '') => text.replace(/[^\w\s]/g, '');

export const removeSpaces = (text = '') => text.replace(/\s/g, '');

export const tallyLetters = (text = '') =>
  text
    .toLowerCase()
    .split('')
    .reduce((tally: { [key: string]: number }, letter: string) => {
      if (!letter.match(/[a-z]/)) return tally;
      tally[letter] = tally[letter] ? tally[letter]! + 1 : 1;
      return tally;
    }, {});
