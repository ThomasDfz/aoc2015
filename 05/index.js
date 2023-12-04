const data = require('../parser')();
const strings = data.split('\n');

const isNice = string => (
  string.split('').filter(char => 'aeiou'.includes(char)).length >= 3
  && string.split('').some((char, i) => char === string[i + 1])
  && !['ab', 'cd', 'pq', 'xy'].some(substr => string.includes(substr))
);

console.log(`Part 1 : ${strings.filter(isNice).length}`);

/**
 * Part 2
 */
const isNiceNewModel = string => (
  string.split('').some((char, i) => (string.substr(i + 2).includes(`${string[i]}${string[i + 1]}`)))
  && (string.split('').some((char, i) => char === string[i + 2]))
);

console.log(`Part 2 : ${strings.filter(isNiceNewModel).length}`);
