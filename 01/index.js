const data = require('../parser')();
const instructions = data.split('');

const floor = instructions.reduce((acc, curr) => (curr === '(') ? acc + 1 : acc - 1, 0);

console.log(`Part 1 : ${floor}`);

const getBasementEnterPosition = () => {
  let currentFloor = 0, i = 0;

  while (currentFloor !== -1 || i > instructions.length) {
    currentFloor += (instructions[i] === '(') ? 1 : -1;
    i++;
  }

  return i;
};

console.log(`Part 2 : ${getBasementEnterPosition()}`);
