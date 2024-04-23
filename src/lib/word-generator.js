import words from './word-list'

export async function generateFileName() {

  if (words.length < 4) {
    throw new Error("Array length must be at least 4");
  }

  // Dont operate on original
  const shuffledArray = words.slice();

  // Fisher-Yates algorithm
  for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray.slice(0, 4).map(word => word.replace(/\s+/g, '+')).join('-');
}