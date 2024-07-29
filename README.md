# Anti-Cipher

---

Explanation of Changes:

1. **Asynchronous Reading:** I used the **[fs.promises]** version of the functions readdir, stat, and **[readFile]** to enable easier management of asynchronous operations.
2. **Error Handling:** I added **[try-catch]** blocks to properly handle errors and output useful error messages.
3. **Simplified Logic:** The functions **[containsHex]** and **[containsStrings]** now use the some method instead of a for loop, making them shorter and more readable.
4. **Character to Hexadecimal Mapping:** The function **[textToHexWithPrefix]** uses the map method to convert text to **[hexadecimal]** format, making the code more readable.

---

**Credits:**

- **Stane**: Created the original script.
- **[Alex]**: Optimized and improved the code.

--- 
