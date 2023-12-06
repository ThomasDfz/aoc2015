const data = require('../parser')();

const wires = new Map();

const initializeInstructions = () => {
  return data
    .split('\n')
    .reduce((acc, instruction) => {
      const [operation, target] = instruction.split(' -> ');

      if (!isNaN(operation)) {
        wires.set(target, Number(operation));
      } else  if (operation.startsWith('NOT')) {
        const sourceA = operation.split(' ').pop();

        acc.push({ operation: 'not', target, sourceA });
      } else if (operation.includes('AND')) {
        const [sourceA, sourceB] = operation.split(' AND ');

        acc.push({ operation: 'and', target, sourceA, sourceB });
      } else if (operation.includes('OR')) {
        const [sourceA, sourceB] = operation.split(' OR ');

        acc.push({ operation: 'or', target, sourceA, sourceB });
      } else if (operation.includes('LSHIFT')) {
        const [sourceA, shift] = operation.split(' LSHIFT ');

        acc.push({ operation: 'lshift', target, sourceA, shift: Number(shift) });
      } else if (operation.includes('RSHIFT')) {
        const [sourceA, shift] = operation.split(' RSHIFT ');

        acc.push({ operation: 'rshift', target, sourceA, shift: Number(shift) });
      } else {
        acc.push({ operation: 'affect', target, sourceA: operation })
      }

      return acc;
  }, []);
};

// returns true if an instruction has been ran, false otherwise
const runInstruction = (instruction) => {
  const { operation, target, sourceA, sourceB, shift } = instruction;

  if (
    (!wires.has(sourceA) && sourceA !== '1')
    || (sourceB !== undefined && !wires.has(sourceB))
  ) return false;

  switch (operation) {
    case 'affect':
      wires.set(target, wires.get(sourceA));

      return true;
    case 'not':
      wires.set(target, ~wires.get(sourceA) & 0xFFFF);

      return true;
    case 'and':
      const leftOperand = sourceA === '1' ? 1 : wires.get(sourceA);
      wires.set(target, leftOperand & wires.get(sourceB) & 0xFFFF);

      return true;
    case 'or':
      wires.set(target, wires.get(sourceA) | wires.get(sourceB) & 0xFFFF);

      return true;
    case 'lshift':
      wires.set(target, (wires.get(sourceA) << shift) & 0xFFFF);

      return true;
    case 'rshift':
      wires.set(target, (wires.get(sourceA) >> shift) & 0xFFFF);

      return true;
    default:
      return false;
  }
};

const runInstructions = (instructions) => {
  let i = 0;

  while (instructions.length !== 0) {
    runInstruction(instructions[i]) ? instructions.splice(i, 1) : i += 1;

    if (i === instructions.length) {
      i = 0;
    }
  }
};

/**
 * Part 1
 */
let instructions = initializeInstructions();
runInstructions(instructions);

const a = wires.get('a');

console.log(`Part 1 : ${a}`);

/**
 * Part 2
 */
wires.clear();

instructions = initializeInstructions();
wires.set('b', a);
runInstructions(instructions);

console.log(`Part 2 : ${wires.get('a')}`);
