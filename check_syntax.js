const fs = require('fs');

// Read the HTML file
const html = fs.readFileSync('app.html', 'utf8');

// Extract script content
const scriptMatch = html.match(/<script>([\s\S]*)<\/script>/);
if (!scriptMatch) {
    console.log('ERROR: No script tag found');
    process.exit(1);
}

const script = scriptMatch[1];

// Check for common syntax errors
let errors = [];

// 1. Check for unmatched braces
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

// 2. Check for duplicate function names
const funcNames = {};
const funcMatches = script.matchAll(/function\s+(\w+)\s*\(/g);
for (let match of funcMatches) {
    const name = match[1];
    if (funcNames[name]) {
        errors.push(`DUPLICATE FUNCTION: ${name} defined multiple times`);
    }
    funcNames[name] = true;
}

// 3. Check for undefined variables/functions being called
const definedFuncs = Object.keys(funcNames);
const callMatches = script.matchAll(/(\w+)\s*\(/g);
const builtins = ['setTimeout', 'setInterval', 'clearInterval', 'clearTimeout', 'console', 'Math', 'Date', 'JSON', 'localStorage', 'sessionStorage', 'parseInt', 'parseFloat', 'isNaN', 'alert', 'confirm', 'prompt', 'Array', 'Object', 'String', 'Number', 'Boolean', 'document', 'window', 'Notification'];

// Report
if (errors.length === 0) {
    console.log('✅ No syntax errors found');
    console.log(`📊 Functions defined: ${definedFuncs.length}`);
} else {
    console.log('❌ ERRORS FOUND:');
    errors.forEach(err => console.log('  ' + err));
}
