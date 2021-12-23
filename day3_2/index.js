'use strict';
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

process.stdout.cork();

let inputList = [];

const constructArray = (numString) => inputList.push(numString);

rl.on('line', (line) => {
  constructArray(line);
});

rl.on('close', () => { 
  const oxygenGeneratorRating = getRating(inputList, 'OXYGEN');
  const co2ScrubberRating = getRating(inputList, 'CO2');
  const lifeSupportRating = oxygenGeneratorRating * co2ScrubberRating;

  console.log('lifeSupportRating: ', lifeSupportRating);

  process.stdout.end();
});


const getRating = (inputList, ratingType) => {
  let masterList = inputList;

  for (let i=0; i<inputList[0].length; i++) {
    if (masterList.length === 1) break;
    let listOf1 = [];
    let listOf2 = [];
    for (const num of masterList) {
      num[i] === '1' ? listOf1.push(num) : listOf2.push(num)
    }
    if (ratingType === 'OXYGEN') {
      masterList = listOf1.length >= listOf2.length ? listOf1 : listOf2
    } else {
      masterList = listOf1.length < listOf2.length ? listOf1 : listOf2
    }
  }
  return parseInt(masterList[0], 2);
};
