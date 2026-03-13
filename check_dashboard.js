const fs = require('fs');

const html = fs.readFileSync('dashboard.html', 'utf8');
const scriptMatch = html.match(/<script>([\s\S]*)<\/script>/);
if (!scriptMatch) {
    console.log('ERROR: No script tag found');
    process.exit(1);
}

const script = scriptMatch[1];
let errors = [];

// Check for unmatched braces
let braceCount = 0;
let lineNum = 0;
for (let line of script.split('\n')) {
    lineNum++;
    for (let char of line) {
        if (char === '{') braceCount++;
        if (char === '}') braceCount--;
        if (braceCount < 0) {
            errors.push(`Line ${lineNum}: Extra closing brace '}'`);
        }
    }
}
if (braceCount !== 0) {
    errors.push(`BRACE MISMATCH: ${braceCount > 0 ? 'Missing' : 'Extra'} ${Math.abs(braceCount)} closing braces`);
}

// Check for duplicate functions
const funcNames = {};
const funcMatches = script.matchAll(/function\s+(\w+)\s*\(/g);
for (let match of funcMatches) {
    const name = match[1];
    if (funcNames[name]) {
        errors.push(`DUPLICATE FUNCTION: ${name}`);
    }
    funcNames[name] = true;
}

if (errors.length === 0) {
    console.log('✅ dashboard.html: No syntax errors');
    console.log(`📊 Functions: ${Object.keys(funcNames).length}`);
} else {
    console.log('❌ dashboard.html ERRORS:');
    errors.forEach(err => console.log('  ' + err));
}
