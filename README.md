# Anti-Cipher

---

### 1. Introduction

This code is a Node.js script used for searching scripts in a specified directory and its subdirectories to detect suspicious patterns. The script specifically looks for certain hexadecimal sequences and strings that might indicate the presence of a backdoor.

### 2. Libraries Used

- **`fs.promises`**: Used for asynchronous file reading and writing. This allows the code to be written in a way that is easier to read and maintain.
- **`path`**: Used for working with file and directory paths, allowing parts of paths to be easily combined across different platforms with varying path styles.

### 3. Key Functions

#### `readFilesInDirectory(directoryPath)`

This function recursively reads all files and directories within the specified `directoryPath`.

- **Reads all files and directories**: Uses `fs.readdir` to list the contents of the directory.
- **Processes each file**: Checks whether each item is a file or a directory. If it's a directory, it calls itself (`readFilesInDirectory`) for that path. If it's a file with a `.lua` extension, it reads the file content and checks if it contains suspicious patterns.
- **Handles errors**: Logs an error message if an error occurs.

#### `isLuaFile(fileName)`

This function checks if the file has a `.lua` extension. It returns `true` if it does, otherwise, it returns `false`.

#### `containsSuspiciousPatterns(data)`

This function checks if `data` contains any suspicious patterns.

- **Calls `containsHex` and `containStrings`** to check if `data` contains any of the hexadecimal patterns or specific strings.

#### `containsHex(data)`

This function checks if `data` contains any of the hexadecimal patterns from the `hexToSearch` array.

- **Uses `textToHexWithPrefix`** to convert hexadecimal sequences into the appropriate format before comparing them with the file content.

#### `containStrings(data)`

This function checks if `data` contains any of the strings from the `stringsToSearch` array.

#### `textToHexWithPrefix(text)`

This function converts a string into hexadecimal format. Each character in the string is converted to its hexadecimal equivalent and returns the string with the `\\x` prefix.

### 4. Script Execution

- **`const currentDirectory = process.cwd();`**: Sets `currentDirectory` to the current working directory.
- **`readFilesInDirectory(currentDirectory)`**: Calls the function to start searching in the current working directory.
- **`catch` block**: If an error occurs during the call to `readFilesInDirectory`, it is caught and logged.

### 5. Summary

- The script searches for suspicious patterns in `.lua` files within the specified directory and all its subdirectories.
- Uses asynchronous functions for file reading and directory operations.
- Searches for specific hexadecimal sequences and strings.
- Logs messages to the console when suspicious patterns are found.

- Here's how you can include the credit information in English:

---

**Credits:**

- **Stane**: Created the original script.
- **[Alex]**: Optimized and improved the code.

--- 
