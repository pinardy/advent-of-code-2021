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
  let [numbersList, boards] = processInput(inputList);
  
  let [lastWinningNumber, lastWinningBoard, lastWinningIndex] = [null, null, null];
  let boardsLeft = boards;

  const [winningNumber, winningBoard, winningBoardIndex] = getWinningBoard(numbersList, boards);
  [lastWinningNumber, lastWinningBoard, lastWinningIndex] = [winningNumber, winningBoard, winningBoardIndex]

  for (let i=0; i<boards.length-1; i++) {
    boardsLeft = boardsLeft.filter((_, index) => index !== lastWinningIndex);
    const [winNum, winBoard, winBoardIndex] = getWinningBoard(numbersList, boardsLeft);
    [lastWinningNumber, lastWinningBoard, lastWinningIndex] = [winNum, winBoard, winBoardIndex]
  }

  const lastBoardFinalScore = getFinalScore(lastWinningNumber, lastWinningBoard);
  console.log('finalScore: ', lastBoardFinalScore);

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
    for (const [index, board] of boards.entries()) {
      for (let i=0; i < board.length; i++) {
        const rowSum = board[i].reduce((acc, curr) => acc + curr);
        const colSum = board.map(row => row[i]).reduce((acc, curr) => acc + curr);
        if (rowSum === -5 || colSum === -5) {
          return [number, board, index];
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