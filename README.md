# Anti-Cipher

---

**Anti-Cipher**: A script that scans all folders while running the server and reading all scripts. It searches for backdoors in the scripts and displays their exact locations in the console.

This script was created by Stane, and I have optimized and refined/shortened the code.

**New Features:**

**Using async/await:**

- We use `fs.promises` for asynchronous file operations, which simplifies the code and improves readability.

**Optimization of Checks:**

- The `containsSuspiciousPatterns` function combines checks for hexadecimal values and strings into a single function for efficiency.

**Improved Logging:**

- We added detailed error messages to make it easier to diagnose issues.

**Consolidation of Hex Encoding:**

- The `textToHexWithPrefix` function uses `map` and `join` for more efficient generation of hexadecimal strings.
