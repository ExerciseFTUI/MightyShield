# MightyShield CyberSecurity Library

CyberGuard is a comprehensive JavaScript library designed to provide essential cybersecurity functionalities for your applications. It offers a range of modules that can be used to enhance the security of your web and mobile applications.

This library is proudly developed and maintained by **EXERCISE FTUI**, a dedicated team passionate about cybersecurity and software development.

## Installation

You can install the MightyShield library using npm:

```bash
npm install mightyshield
```
## Usage
Basic Usage
```javascript
import { PasswordStrengthChecker } from 'mightyshield';

const passwordChecker = new PasswordStrengthChecker()
  .minLength(8)
  .haveUppercase()
  .haveLowercase()
  .haveNumbers()
  .haveSymbols();

const password = 'SecurePa$$w0rd';
const validationResult = passwordChecker.validate(password);

if (validationResult.valid) {
  console.log('Password meets all criteria.');
} else {
  console.log('Password does not meet the following criteria:');
  console.log(validationResult.unmetRules.join(', '));
}

const passwordScore = passwordChecker.calculateScore(password);
console.log('Password Score:', passwordScore);
```

### Methods
- minLength(length: number): this: Specifies the minimum length requirement for the password.
- maxLength(length: number): this: Specifies the maximum length requirement for the password.
- haveUppercase(): this: Requires the password to contain at least one uppercase letter.
- haveLowercase(): this: Requires the password to contain at least one lowercase letter.
- haveNumbers(): this: Requires the password to contain at least one digit.
- haveSymbols(): this: Requires the password to contain at least one special character.
- validate(password: string): { valid: boolean; unmetRules: string[] }: Validates the password against the defined criteria and returns validation result.
- calculateScore(password: string): number: Calculates the password score based on predefined criteria.
Contributing
Contributions are welcome! Feel free to open issues and pull requests for improvements, bug fixes, or new features.

## License
This project is licensed under the MIT License - see the LICENSE file for details.


Please make sure to adapt this `README.md` to fit 