const input = require('../misc/load-input')().split('\n').filter(Boolean);
const banks = input.map(line => line.split('').map(Number));

/**
 * @param {number[]} bank
 * @param {number} batteryCount
 */
function getMaxJoltage(bank, batteryCount) {
  if (batteryCount === 1) {
    return Math.max(...bank);
  }
  const remainingBatteryCount = batteryCount - 1
  const maxForLeft = Math.max(...bank.slice(0, -remainingBatteryCount));
  const leftIndex = bank.indexOf(maxForLeft);
  const rightPart = bank.slice(leftIndex + 1);
  const rightJoltage = getMaxJoltage(rightPart, remainingBatteryCount);
  const joltage = maxForLeft * Math.pow(10, remainingBatteryCount) + rightJoltage;
  return joltage;
}

const maxJoltages1 = banks.map(bank => getMaxJoltage(bank, 2));
const sum1 = maxJoltages1.reduce((a, b) => a + b);
console.log(sum1);

const maxJoltages2 = banks.map(bank => getMaxJoltage(bank, 12));
const sum2 = maxJoltages2.reduce((a, b) => a + b);
console.log(sum2);