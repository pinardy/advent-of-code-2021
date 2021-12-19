'use strict';
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

process.stdout.cork();

let totalInputSize = 0;
let inputList = [];

rl.on('line', (line) => {
  totalInputSize += 1;
  constructArray(line);
});

rl.on('close', () => {
  const binaryMap = getBinaryMap(inputList);
  const [gammaRateDecimal, epsilonRateDecimal] = getRates(binaryMap);
  const powerConsumption = gammaRateDecimal * epsilonRateDecimal;

  console.log(powerConsumption);

  process.stdout.end();
});

const getBinaryMap = (inputList) => {
  const length = inputList[0].length;
  let binaryMap = {};

  for (let i=0; i<length; i++) {
    binaryMap[i] = 0;
  }

  for (let i=0; i<inputList.length; i++) {
    for (let j=0; j<length; j++) {
      binaryMap[j] += +inputList[i][j];
    }
  }
  return binaryMap;
};

const getRates = (binaryMap) => {
  let gammaRateBinary = '';
  let epsilonRateBinary = '';

  for (const index in binaryMap) {
    if (binaryMap[index] > totalInputSize / 2) {
      gammaRateBinary += 1;
      epsilonRateBinary += 0;
    } else {
      gammaRateBinary += 0;
      epsilonRateBinary += 1;
    }
  }
  const gammaRateDecimal = parseInt(gammaRateBinary, 2);
  const epsilonRateDecimal = parseInt(epsilonRateBinary, 2);

  return [gammaRateDecimal, epsilonRateDecimal];
};

const constructArray = (numString) => inputList.push(numString);