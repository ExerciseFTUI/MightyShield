import * as constants from './constants';

export function calculateScore(password: string): number {
  const length = password.length;
  let score = length * 4; // Start with a base score

  // Deduct points for repeating characters (case-insensitive)
  password.replace(constants.REPEATING_CHARACTERS, (match, character) => {
    score -= match.length - 1;
    return match;
  });

  // Deduct points for consecutive characters
  password.replace(constants.CONSECUTIVE_CHARACTERS, (match, sequence) => {
    score -= sequence.length;
    return match;
  });

  // Deduct points for keyboard patterns
  if (constants.KEYBOARD_PATTERNS.test(password)) {
    score -= 20;
  }

  // Deduct points for predictable sequences
  if (constants.PREDICTABLE_SEQUENCES.test(password)) {
    score -= 10;
  }

  // Add points for character class variations
  const characterClasses: Record<string, RegExp> = {
    lowercase: constants.LOWERCASE_LETTERS,
    uppercase: constants.UPPERCASE_LETTERS,
    digits: constants.DIGITS,
    symbols: constants.SYMBOLS
  };

  let classVariations = 0;
  for (const type in characterClasses) {
  if (characterClasses.hasOwnProperty(type) && characterClasses[type]?.test(password)) {
    classVariations++;
  }
}
score += (classVariations - 1) * 10;

  // Add points for middle numbers or symbols
  if (constants.MIDDLE_NUMBERS_SYMBOLS.test(password)) {
    score += 20;
  }

  // Cap the score to a maximum of 100
  score = Math.max(0, Math.min(score, 100));

  return score;
}