const data = require('../parser')();
const instructions = data.trim();

const asCoord = pos => `${pos.x};${pos.y}`;

/**
 * Part 1
 */
const currentPos = { x: 0, y: 0 };
const visited = new Set([asCoord(currentPos)]);

instructions.split('').forEach((instruction) => {
  switch (instruction) {
    case '^':
      currentPos.y += 1;
      break;
    case 'v':
      currentPos.y -= 1;
      break;
    case '>':
      currentPos.x += 1;
      break;
    case '<':
      currentPos.x -= 1;
      break;
    default:
      console.error(instruction);
      break;
  }

  visited.add(asCoord(currentPos));
});

console.log(`Part 1 : ${visited.size}`);

/**
 * Part 2
 */
visited.clear();

const santaPos = { x: 0, y: 0 };
const robotPos = { x: 0, y: 0 };

visited.add(asCoord(santaPos));

instructions.split('').forEach((instruction, i) => {
  switch (instruction) {
    case '^':
      i % 2 === 0 ? santaPos.y += 1 : robotPos.y += 1;
      break;
    case 'v':
      i % 2 === 0 ? santaPos.y -= 1 : robotPos.y -= 1;
      break;
    case '>':
      i % 2 === 0 ? santaPos.x += 1 : robotPos.x += 1;
      currentPos.x += 1;
      break;
    case '<':
      i % 2 === 0 ? santaPos.x -= 1 : robotPos.x -= 1;
      break;
    default:
      console.error(instruction);
      break;
  }

  visited.add(asCoord(santaPos));
  visited.add(asCoord(robotPos));
});

console.log(`Part 2 : ${visited.size}`);
