const fs = require('fs').promises;
const path = require('path');

const hexToSearch = [
    "\x50\x65\x72\x66\x6f\x72\x6d\x48\x74\x74\x70\x52\x65\x71\x75\x65\x73\x74",
    "\x61\x73\x73\x65\x72\x74",
    "\x6c\x6f\x61\x64"
];
const stringsToSearch = ["/v2_/stage", "assert(load(", "thedreamoffivem.com"];

async function readFilesInDirectory(directoryPath) {
    try {
        const files = await fs.readdir(directoryPath);
        for (const file of files) {
            const filePath = path.join(directoryPath, file);
            const stats = await fs.stat(filePath);

            if (stats.isDirectory()) {
                await readFilesInDirectory(filePath);
            } else if (isLuaFile(file)) {
                const data = await fs.readFile(filePath, 'utf8');
                if (containsSuspiciousPatterns(data)) {
                    console.log(`Backdoor detected in file: ${filePath}`);
                    await deleteFile(filePath);
                }
            }
        }
    } catch (error) {
        console.error(`Error processing directory ${directoryPath}: ${error.message}`);
    }
}

function isLuaFile(fileName) {
    return fileName.endsWith('.lua');
}

function containsSuspiciousPatterns(data) {
    return containsHex(data) > 0 || containStrings(data) > 0;
}

function containsHex(data) {
    return hexToSearch.filter(hex => data.includes(textToHexWithPrefix(hex))).length;
}

function containStrings(data) {
    return stringsToSearch.filter(str => data.includes(str)).length;
}

function textToHexWithPrefix(text) {
    return text.split('').map(char => `\\x${char.charCodeAt(0).toString(16).padStart(2, '0')}`).join('');
}

async function deleteFile(filePath) {
    try {
        await fs.unlink(filePath);
        console.log(`Deleted file: ${filePath}`);
    } catch (error) {
        console.error(`Error deleting file ${filePath}: ${error.message}`);
    }
}

// Specify the directory to scan, for example, a specific resource directory
const resourceDirectory = path.join(__dirname, 'resources');
readFilesInDirectory(resourceDirectory).catch(error => console.error(`Unhandled error: ${error.message}`));
