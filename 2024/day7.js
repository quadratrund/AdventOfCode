const equations = require('../load-input')().split('\n')
  .filter(Boolean)
  .map(line => line.split(/:?\s/).map(Number))
  .map(([result, ...values]) => ({result, values}));

/**
 * @param {number} result
 * @param {number[]} values
 */
function isEquationValid1(result, values) {
  if (values.length <= 1) {
    return result === values[0];
  }
  const lastValue = values[values.length - 1];
  if (result < lastValue) {
    return false;
  }
  const prevValues = values.slice(0, values.length - 1);
  if (result % lastValue === 0 && isEquationValid1(result / lastValue, prevValues)) {
    return true;
  }
  return isEquationValid1(result - lastValue, prevValues);
}

const validEquations1 = equations.filter(({result, values}) => isEquationValid1(result, values));
const sum1 = validEquations1.reduce((prev, curr) => prev + curr.result, 0);
console.log(sum1);

// -----

/**
 * @param {number} result
 * @param {number[]} values
 */
function isEquationValid2(result, values) {
  if (values.length <= 1) {
    return result === values[0];
  }
  const lastValue = values[values.length - 1];
  if (result < lastValue) {
    return false;
  }
  const prevValues = values.slice(0, values.length - 1);
  const resultString = String(result);
  const lastValueString = String(lastValue);
  if(resultString.endsWith(lastValueString) && isEquationValid2(Number(resultString.substring(0, resultString.length -  lastValueString.length)), prevValues)) {
    return true;
  }
  if (result % lastValue === 0 && isEquationValid2(result / lastValue, prevValues)) {
    return true;
  }
  return isEquationValid2(result - lastValue, prevValues);
}

const validEquations2 = equations.filter(({result, values}) => isEquationValid2(result, values));
const sum2 = validEquations2.reduce((prev, curr) => prev + curr.result, 0);
console.log(sum2);

console.log(equations.filter(equation => equation.result > Number.MAX_SAFE_INTEGER));