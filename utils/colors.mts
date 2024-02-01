import colors from './colors.json' assert {type: 'json'}

const deduped = [...new Set(colors)];

console.log({colors: colors.length, deduped: deduped.length});

debugger;