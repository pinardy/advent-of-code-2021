'use strict';
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

process.stdout.cork();

rl.on('line', (line) => {
  constructArray(+line);
});

rl.on('close', () => {
  console.log(getSumsLargerThanPrevSums(inputList));
  process.stdout.end();
});

let inputList = [];

const constructArray = (num) => inputList.push(num);

const getSumsLargerThanPrevSums = (inputList) => {
  let lastRecordedSum = null;
  let sumsLargerThanPrevSums = 0;

  // Sliding window
  for (let i=3; i < inputList.length+1; i++) {
    const window = inputList.slice(i-3, i);
    const sum = window.reduce((a, b) => a + b, 0);
    if (lastRecordedSum && sum > lastRecordedSum) sumsLargerThanPrevSums += 1;
    lastRecordedSum = sum;
  }

  return sumsLargerThanPrevSums;
};