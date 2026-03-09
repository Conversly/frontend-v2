const fs = require('fs');
const code = fs.readFileSync('client_v2/components/landing/navbar.tsx', 'utf8');

// Simplified JSX tag parser
let tags = [];
let re = /<\/?([a-zA-Z0-9]+)[^>]*?(\/?)>/g;
let match;

while ((match = re.exec(code)) !== null) {
    let text = match[0];
    if (text.includes("/*") || text.includes("*/")) continue; // ignore comments inside tags roughly

    // also ignore if it's inside a string.

    let isClosing = text.startsWith('</');
    let isSelfClosing = text.endsWith('/>') || text.endsWith('/ >');
    let tagName = match[1];

    if (tagName === 'br' || tagName === 'hr' || tagName === 'img' || tagName === 'input') continue;

    let lineStr = code.substring(0, match.index);
    let lineNum = lineStr.split('\n').length;

    if (isSelfClosing) continue;

    if (!isClosing) {
        tags.push({ name: tagName, line: lineNum });
    } else {
        if (tags.length === 0) {
            console.log('Extra closing tag', tagName, 'at line', lineNum);
            break;
        }
        let expected = tags.pop();
        if (expected.name !== tagName) {
            console.log(`Mismatch at line ${lineNum}: expected closing ${expected.name} (from line ${expected.line}), but found closing ${tagName}`);
            break;
        }
    }
}
console.log('Remaining unclosed open tags (from bottom):');
for (let i = Math.max(0, tags.length - 5); i < tags.length; i++) {
    console.log('  ', tags[i].name, 'at line', tags[i].line);
}
