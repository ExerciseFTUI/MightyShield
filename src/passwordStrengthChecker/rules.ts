import * as constants from './constants';

export function minLength(length: number): (password: string) => boolean {
  return (password: string) => password.length >= length;
}

export function maxLength(length: number): (password: string) => boolean {
  return (password: string) => password.length <= length;
}

export function haveUppercase(): (password: string) => boolean {
  return (password: string) => constants.UPPERCASE_LETTERS.test(password);
}

export function haveLowercase(): (password: string) => boolean {
  return (password: string) => constants.LOWERCASE_LETTERS.test(password);
}

export function haveNumbers(): (password: string) => boolean {
  return (password: string) => constants.DIGITS.test(password);
}

export function haveSymbols(): (password: string) => boolean {
  return (password: string) => constants.SYMBOLS.test(password);
}

