'use strict';
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

process.stdout.cork();

let inputList = [];

const constructArray = (numString) => inputList.push(numString);

const getBoards = (stringInputs) => {
  let cleanedStringInputs = stringInputs.filter(string => string !== '');
  let boards = [];

  for (let i = 0; i < cleanedStringInputs.length; i += 5) {
    let board = []
    const inputSlice = cleanedStringInputs.slice(i, i+5);
    
    inputSlice.forEach((row) => {
      let numberStringList = row.split(' ').filter(string => string !== '');
      board.push(numberStringList.map(Number))
    });
    boards.push(board);
  }
  return boards;
}

const processInput = (inputList) => {
  const numbersList = inputList[0].split(',').map(Number);
  const boards = getBoards(inputList.slice(2));
  return [numbersList, boards];
};

rl.on('line', (line) => {
  constructArray(line);
});

rl.on('close', () => { 
  const [numbersList, boards] = processInput(inputList);
  const [winningNumber, winningBoard] = getWinningBoard(numbersList, boards);
  const finalScore = getFinalScore(winningNumber, winningBoard);

  process.stdout.write(`finalScore: ${finalScore}`);
  process.stdout.end();
});

const getWinningBoard = (numbersList, boards) => {
  for (const number of numbersList) {
    for (const board of boards) {
      for (const row of board) {
        if (row.includes(number)) {
          const index = row.indexOf(number);
          row[index] = -1;
        }
      }
    }
    // check if any board has a complete row/col
    for (const board of boards) {
      for (let i=0; i < board.length; i++) {
        const rowSum = board[i].reduce((acc, curr) => acc + curr);
        const colSum = board.map(row => row[i]).reduce((acc, curr) => acc + curr);
        if (rowSum === -5 || colSum === -5) {
          return [number, board];
        }
      }
    }
  }
  return null;
};

const getFinalScore = (winningNumber, winningBoard) => {
  let sum = 0;
  for (const row of winningBoard) {
    const filteredNumbers = row.filter(num => num !== -1);
    filteredNumbers.forEach((num) => sum += num);
  }
  return winningNumber * sum;
};