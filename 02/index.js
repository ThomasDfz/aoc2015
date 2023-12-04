const data = require('../parser')();
const dimensions = data.split('\n');

const paperSqft = dimensions.reduce((acc, dimension) => {
  const [l, w, h] = dimension.split('x');
  const side1 = Number(l) * Number(w);
  const side2 = Number(w) * Number(h);
  const side3 = Number(h) * Number(l);

  return acc + 2 * side1 + 2 * side2 + 2 * side3 + Math.min(side1, side2, side3);
}, 0);

console.log(`Part 1 : ${paperSqft}`);

const ribbonFeet = dimensions.reduce((acc, dimension) => {
  const [l, w, h] = dimension.split('x');
  const perimeter1 = 2 * Number(l) + 2 * Number(w);
  const perimeter2 = 2 * Number(w) + 2 * Number(h);
  const perimeter3 = 2 * Number(h) + 2 * Number(l);

  return acc + Math.min(perimeter1, perimeter2, perimeter3) + Number(l) * Number(w) * Number(h);
}, 0);

console.log(`Part 2 : ${ribbonFeet}`);
