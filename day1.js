const { readFileSync } = require('fs');

const buffer = readFileSync('input-a1.txt');
const text = buffer.toString('utf8').split('\n').filter(Boolean);
//console.log(text);

// Part 1
const numbers = text.map(line => {
	const digits = line.split('').filter(x => /\d/.test(x));
	if (digits.length === 0) return 0;
	return (10 * Number(digits[0])) + Number(digits[digits.length - 1]);
});
//console.log(numbers);
const sum = numbers.reduce((a, b) => a + b);
console.log(sum);

// Part 2
const regexFirst = /^.*?([0-9]|one|two|three|four|five|six|seven|eight|nine)/;
const regexLast = /^.*([0-9]|one|two|three|four|five|six|seven|eight|nine)/;
const writtenNumbers = 'zero|one|two|three|four|five|six|seven|eight|nine'.split('|');
const tokens = text.map(line => [line.match(regexFirst)[1], line.match(regexLast)[1]]);
//console.log(tokens);
const numbers2 = tokens.map(line => {
	const digits = line.map(x => /\d/.test(x) ? Number(x) : writtenNumbers.indexOf(x));
	if (digits.some(x => x < 1 || x > 9)) throw digits;
	if (digits.length === 0) return 0;
	return (10 * digits[0]) + digits[digits.length - 1];
});
//console.log(numbers2);
const sum2 = numbers2.reduce((a, b) => a + b);
console.log(sum2);
