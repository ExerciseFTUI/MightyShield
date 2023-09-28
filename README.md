# MightyShield CyberSecurity Library

MightyShield is a comprehensive JavaScript library designed to provide essential cybersecurity functionalities for your applications. It offers a range of modules that can be used to enhance the security of your web and mobile applications.

This library is proudly developed and maintained by **EXERCISE FTUI**, a dedicated team passionate about cybersecurity and software development.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Methods](#methods)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Installation

You can install the MightyShield library using npm:

```bash
npm install mightyshield
```
## Usage
Password Strength Checker
```javascript
import { PasswordStrengthChecker } from 'mightyshield';

const passwordChecker = new PasswordStrengthChecker()
  .minLength(8)
  .maxLength(30)
  .haveUppercase()
  .haveLowercase()
  .haveNumbers()
  .haveSymbols();

// Validate Password
console.log(passwordChecker.validate('SecurePa$$w0rd'));
// => True

console.log(passwordChecker.validate('Test'));
// => False

// Calculate Score
console.log(passwordChecker.calculateScore(password));
// Return Calculated PasswordScore
```

IP Whitelist Blacklist

```javascript
import { IPMiddlewareConfig } from "@exerciseftui/mightyshield-ipwhitelistblacklist";
import { IPWhitelistBlacklist } from "@exerciseftui/mightyshield-ipwhitelistblacklist";

const app = express();
const port = 3000;

// Define your JSON configuration with parameters
const config: IPMiddlewareConfig = {
  whitelist: ["192.168.1.[0-9]"],
  blacklist: ["192.168.1.[10-30]"],
};

// Create an instance of IPWhitelistBlacklist with the configuration
const ipWhitelistBlacklistMiddleware = new IPWhitelistBlacklist(config);

// Apply the IPWhitelistBlacklist middleware to all routes
app.use(ipWhitelistBlacklistMiddleware.middleware);

// Test and Example routes
app.get("/", (req, res) => {
  res.send("Test Express JS/TS with IP whitelist and blacklist");
});

app.get("/hello", (req, res) => {
  res.send("Hello, this route is also protected by IP filtering");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
```
## Configuration

The IP Whitelist and Blacklist module uses a configuration object to define whitelist and blacklist rules. The configuration interface is as follows:

```typescript
export interface IPMiddlewareConfig {
  whitelist: string[];
  blacklist: string[];
}
```

- `whitelist`: An array of IP address patterns to be whitelisted.
- `blacklist`: An array of IP address patterns to be blacklisted.
  
## Methods

### Password Strength Checker

- `minLength(length: number): this`
  - Specifies the minimum length requirement for the password.

- `maxLength(length: number): this`
  - Specifies the maximum length requirement for the password.

- `haveUppercase(): this`
  - Requires the password to contain at least one uppercase letter.

- `haveLowercase(): this`
  - Requires the password to contain at least one lowercase letter.

- `haveNumbers(): this`
  - Requires the password to contain at least one digit.

- `haveSymbols(): this`
  - Requires the password to contain at least one special character.

- `validate(password: string): { valid: boolean; unmetRules: string[] }`
  - Validates the password against the defined criteria and returns validation result.

- `calculateScore(password: string): number`
  - Calculates the password score based on predefined criteria.

### IP Whitelist Blacklist

#### `middleware(req: Request, res: Response, next: NextFunction): void`
The `middleware` method is the core functionality of this module. It checks incoming requests for IP addresses and enforces the configured whitelist and blacklist rules. If an IP address is not whitelisted or is blacklisted, it responds with a 403 error.

#### Utility Functions

- `convertToRegex(ipPatterns: string[]): RegExp[]`
  - Converts an array of IP address patterns into regular expressions for pattern matching. It is used to create regular expressions from user-defined IP address patterns for whitelist and blacklist rules.

- `isLocalhost(clientIp: string): boolean`
  - Checks whether the client's IP address is a localhost address. It returns `true` if the IP address matches either "127.0.0.1" (IPv4) or "::1" (IPv6), indicating that the client is accessing the application from the localhost.


## Examples

Here are some examples of IP address patterns and how they work with the module:

- Whitelist IP Range: `"192.168.1.[0-9]"` allows any IP address in the range `192.168.1.0` to `192.168.1.9`.
- Blacklist IP Range: `"192.168.1.[10-30]"` blocks any IP address in the range `192.168.1.10` to `192.168.1.30`.
- Whitelist All: `"*"` allows all IP addresses.

## Contributing
Contributions are welcome! Feel free to open issues and pull requests for improvements, bug fixes, or new features.

## License
This project is licensed under the MIT License - see the LICENSE file for details.


Please make sure to adapt this `README.md` to fit 
