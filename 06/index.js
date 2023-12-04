const data = require('../parser')();
const instructions = data
  .split('\n')
  .map(instruction => {
    const parts = instruction.split(' through ');
    const to = parts.pop().split(',').map(Number);
    const from = parts[0].split(' ').pop().split(',').map(Number);

    return {
      from,
      to,
      action: parts[0].startsWith('toggle') ? 'toggle' : (parts[0].startsWith('turn on') ? 'on' : 'off'),
    };
  });

const getRange = (from, to) => {
  const [xa, ya] = from;
  const [xb, yb] = to;
  const range = [];

  for (let i = xa; i <= xb; i += 1) {
    for (let j = ya; j <= yb; j += 1) {
      range.push(`${i};${j}`);
    }
  }

  return range;
};

/**
 * Part 1
 */
const toggled = new Set();

instructions.forEach(instruction => {
  const range = getRange(instruction.from, instruction.to);

  switch (instruction.action) {
    case 'on':
      range.forEach(toggled.add);
      break;
    case 'off':
      range.forEach(toggled.delete);
      break;
    case 'toggle':
      range.forEach(coord => toggled.has(coord) ? toggled.delete(coord) : toggled.add(coord));
      break;
    default:
      console.error(instruction);
  }
});

console.log(`Part 1 : ${toggled.size}`);

/**
 * Part 2
 */
const brightnesses = new Map();

brightnesses.increase = function (key, increment = 1) {
  this.has(key) ? this.set(key, this.get(key) + increment) : this.set(key, increment);
};

brightnesses.decrease = function (key) {
  this.has(key) ? this.set(key, Math.max(this.get(key) - 1, 0)) : this.set(key, 0);
};

instructions.forEach(instruction => {
  const range = getRange(instruction.from, instruction.to);

  switch (instruction.action) {
    case 'on':
      range.forEach(brightnesses.increase);
      break;
    case 'off':
      range.forEach(brightnesses.decrease);
      break;
    case 'toggle':
      range.forEach(coord => brightnesses.increase(coord, 2));
      break;
    default:
      console.error(instruction);
  }
});

const total = Array.from(brightnesses.values()).reduce((acc, curr) => acc + curr, 0);

console.log(`Part 2 : ${total}`);
