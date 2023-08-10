export const LOWERCASE_LETTERS = /[a-z]/;
export const UPPERCASE_LETTERS = /[A-Z]/;
export const DIGITS = /\d/;
export const SYMBOLS = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

export const REPEATING_CHARACTERS = /(\w)\1+/gi;
export const CONSECUTIVE_CHARACTERS = /(abc|def|ghi|jkl|mno|pqr|stu|vwx|yz|012|345|678|789|987|654|321|zyx|wvu|tsr|qpo|nml|kji|hgf|edc|ba)/gi;
export const KEYBOARD_PATTERNS = /(qwerty|qazwsx|azsxdc|zxcvbnm|123456|654321|147258369|369258147)/gi;
export const PREDICTABLE_SEQUENCES = /(123456|234567|345678|456789|567890|qwerty|asdfgh|zxcvbn|poiuyt)/gi;
export const MIDDLE_NUMBERS_SYMBOLS = /[^a-z][\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-][^a-z]/i;
