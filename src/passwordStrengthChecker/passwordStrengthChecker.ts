import * as rules from './rules';
import { calculateScore } from './utils';

export class PasswordStrengthChecker {
  private rules: { description: string; ruleFunction: (password: string) => boolean }[];

  constructor() {
    this.rules = [];
  }

  private _register(description: string, ruleFunction: (password: string) => boolean): this {
    this.rules.push({ description, ruleFunction });
    return this;
  }

  minLength(length: number): this {
    return this._register(`Minimum Length (${length})`, rules.minLength(length));
  }

  maxLength(length: number): this {
    return this._register(`Maximum Length (${length})`, rules.maxLength(length));
  }

  haveUppercase(): this {
    return this._register("Uppercase Letter", rules.haveUppercase());
  }

  haveLowercase(): this {
    return this._register("Lowercase Letter", rules.haveLowercase());
  }

  haveNumbers(): this {
    return this._register("Digit", rules.haveNumbers());
  }

  haveSymbols(): this {
    return this._register("Special Character", rules.haveSymbols());
  }

  validate(password: string): { valid: boolean; unmetRules: string[] } {
    const unmetRules: string[] = [];

    for (const rule of this.rules) {
      const passed = rule.ruleFunction(password);
      if (!passed) {
        unmetRules.push(rule.description);
      }
    }

    const valid = unmetRules.length === 0;
    return { valid, unmetRules };
  }

  calculateScore(password: string): number {
    return calculateScore(password);
  }
}
