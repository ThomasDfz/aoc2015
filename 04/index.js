const crypto = require('crypto');
const data = require('../parser')();
const input = data.trim();

const mineAdventCoin = leadingZeroes => {
  let hash, i = 1, isFound = false;

  do {
    hash = crypto.createHash('md5').update(`${input}${i}`).digest("hex");

    hash.slice(0, leadingZeroes) === '0'.repeat(leadingZeroes) ? isFound = true : i++;
  } while (!isFound);

  return i;
};

console.log(`1) ${mineAdventCoin(5)}`);
console.log(`2) ${mineAdventCoin(6)}`);
