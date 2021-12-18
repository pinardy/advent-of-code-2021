'use strict';
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

process.stdout.cork();

let horizontalDistance = 0;
let depth = 0;
let aim = 0;

rl.on('line', (line) => {
  const [direction, amount] = processInput(line);
  computeDistance(direction, amount);
});

rl.on('close', () => {
  const finalValue = horizontalDistance * depth;
  console.log(finalValue);
  process.stdout.end();
});

const processInput = (line) => {
  const [direction, amount] = line.split(" ");
  return [direction, +amount];
};

const computeDistance = (direction, amount) => {
  switch (direction) {
    case 'forward':
      horizontalDistance += amount;
      depth += aim * amount;
      break;
    case 'down':
      aim += amount;
      break;
    case 'up':
      aim -= amount;
      break;
    default:
      console.log('Invalid direction');
      break;
  }
};