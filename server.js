const fs = require('fs').promises;
const path = require('path');

const hexToSearch = ["\x50\x65\x72\x66\x6f\x72\x6d\x48\x74\x74\x70\x52\x65\x71\x75\x65\x73\x74", "\x61\x73\x73\x65\x72\x74", "\x6c\x6f\x61\x64"];
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
                if (containsHex(data) || containsStrings(data)) {
                    console.log(`Backdoor found in file: ${filePath}`);
                }
            }
        }
    } catch (err) {
        console.error(`Error reading directory ${directoryPath}: ${err.message}`);
    }
}

function isLuaFile(fileName) {
    return fileName.endsWith('.lua');
}

function containsHex(data) {
    return hexToSearch.some(hex => data.includes(textToHexWithPrefix(hex)));
}

function containsStrings(data) {
    return stringsToSearch.some(str => data.includes(str));
}

function textToHexWithPrefix(text) {
    return text.split('').map(char => '\\x' + char.charCodeAt(0).toString(16).padStart(2, '0')).join('');
}

const currentDirectory = process.cwd();
readFilesInDirectory(currentDirectory);
