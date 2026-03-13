const fs = require('fs');

const html = fs.readFileSync('app.html', 'utf8');
const scriptMatch = html.match(/<script>([\s\S]*)<\/script>/);
const script = scriptMatch[1];

// Get all defined functions
const defined = new Set();
const funcMatches = script.matchAll(/function\s+(\w+)\s*\(/g);
for (let match of funcMatches) {
    defined.add(match[1]);
}

// Get all function calls
const called = new Set();
const callMatches = script.matchAll(/\b(\w+)\s*\(/g);
for (let match of callMatches) {
    called.add(match[1]);
}

// Built-in functions to ignore
const builtins = new Set(['setTimeout', 'setInterval', 'clearInterval', 'clearTimeout', 'console', 'Math', 'Date', 'JSON', 'localStorage', 'sessionStorage', 'parseInt', 'parseFloat', 'isNaN', 'alert', 'confirm', 'prompt', 'Array', 'Object', 'String', 'Number', 'Boolean', 'document', 'window', 'Notification', 'fetch', 'Promise', 'Error', 'Set', 'Map', 'addEventListener', 'removeEventListener', 'querySelector', 'querySelectorAll', 'getElementById', 'createElement', 'appendChild', 'removeChild', 'setAttribute', 'getAttribute', 'classList', 'style', 'textContent', 'innerHTML', 'value', 'checked', 'disabled', 'hidden', 'length', 'push', 'pop', 'shift', 'unshift', 'splice', 'slice', 'indexOf', 'includes', 'filter', 'map', 'reduce', 'forEach', 'find', 'findIndex', 'some', 'every', 'sort', 'reverse', 'join', 'split', 'replace', 'match', 'test', 'exec', 'toString', 'toUpperCase', 'toLowerCase', 'trim', 'padStart', 'padEnd', 'startsWith', 'endsWith', 'repeat', 'substring', 'substr', 'charAt', 'charCodeAt', 'concat', 'toFixed', 'toPrecision', 'toExponential', 'toLocaleString', 'toISOString', 'toDateString', 'toTimeString', 'getTime', 'getDate', 'getMonth', 'getFullYear', 'getHours', 'getMinutes', 'getSeconds', 'getMilliseconds', 'setDate', 'setMonth', 'setFullYear', 'setHours', 'setMinutes', 'setSeconds', 'setMilliseconds', 'now', 'parse', 'stringify', 'keys', 'values', 'entries', 'assign', 'freeze', 'seal', 'create', 'defineProperty', 'getOwnPropertyNames', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'valueOf', 'constructor', 'prototype', 'AudioContext', 'webkitAudioContext', 'createOscillator', 'createGain', 'connect', 'start', 'stop', 'setValueAtTime', 'exponentialRampToValueAtTime', 'FileReader', 'Blob', 'URL', 'createObjectURL', 'revokeObjectURL', 'btoa', 'atob', 'encodeURIComponent', 'decodeURIComponent', 'requestAnimationFrame', 'cancelAnimationFrame', 'getComputedStyle', 'matchMedia', 'scrollTo', 'scrollBy', 'scrollIntoView']);

// Find undefined
const undefined_calls = [];
for (let name of called) {
    if (!defined.has(name) && !builtins.has(name) && name !== 'supabaseClient') {
        undefined_calls.push(name);
    }
}

if (undefined_calls.length > 0) {
    console.log('⚠️  Potentially undefined functions called:');
    undefined_calls.slice(0, 10).forEach(name => console.log(`  - ${name}()`));
    if (undefined_calls.length > 10) {
        console.log(`  ... and ${undefined_calls.length - 10} more`);
    }
} else {
    console.log('✅ No undefined function calls detected');
}

console.log(`\n📊 Total functions defined: ${defined.size}`);
console.log(`📊 Total functions called: ${called.size}`);
