'use strict';
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

process.stdout.cork();

let lastRecordedNum = null;
let incrementCount = 0;

rl.on('line', (line) => {
  main(line);
});

rl.on('close', () => {
  console.log(incrementCount);
  process.stdout.end();
});

const main = (line,) => {
  const num = +line;
  if (lastRecordedNum && num > lastRecordedNum) incrementCount += 1
  lastRecordedNum = num
};