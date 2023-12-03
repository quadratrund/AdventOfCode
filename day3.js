const { readFileSync } = require('fs');

const buffer = readFileSync('input-a3.txt');
const text = buffer.toString('utf8').split('\n').filter(Boolean); //.map(line => line.split(''));
//console.log(text);

// Part 1
const numbers = text.map(line => Array.from(line.matchAll(/[0-9]+/g)));
//console.log(numbers);

function isPartNumber(startX, length, y) {
    if (y > 0 && /[^.0-9]/.test(text[y - 1].substring(Math.max(startX - 1, 0), startX + length + 1))) {
        return true;
    }
    if (y < text.length - 1 && /[^.0-9]/.test(text[y + 1].substring(Math.max(startX - 1, 0), startX + length + 1))) {
        return true;
    }
    if ((text[y][startX - 1] ?? '.') !== '.' || (text[y][startX + length] ?? '.') !== '.') {
        return true;
    }
    return false;
}

const partNumbers = numbers
    .flatMap((line, y) => line.filter(match => isPartNumber(match.index, match[0].length, y)))
    .map(match => Number(match[0]));
//console.log(partNumbers);
const sum = partNumbers.reduce((a, b) => a + b);
console.log(sum);

// Part 2
const gears = text.flatMap((line, index) => Array.from(line.matchAll(/\*/g)).map(x => [index, x.index]));
//console.log(gears);

const filteredGears = gears
    .map(([y, x]) => numbers
        .slice(y - 1, y + 2)
        .flat(1)
        .filter(match => x + 1 >= match.index && x - 1 <= match.index + match[0].length - 1)
    )
    .filter(x => x.length === 2);
//console.log(filteredGears);
const sum2 = filteredGears
    .map(([a, b]) => a[0] * b[0])
    .reduce((a, b) => a + b);
console.log(sum2);
