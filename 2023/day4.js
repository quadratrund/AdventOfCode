const { readFileSync } = require('fs');

const buffer = readFileSync('input-day4.txt');
const text = buffer.toString('utf8').split('\n').filter(Boolean);

const cards = text.map(line => {
    let [ id, numbers ] = line.substring(5).split(':');
    id = Number(id);
    const [win, own] = numbers.split('|').map(x => x.trim().split(/ +/).map(Number));
    const matches = own.filter(x => win.includes(x)).length
    return { id, win, own, matches };
});
//console.log(cards);

// Part 1
const points = cards
    .filter(c => c.matches > 0)
    .map(c => Math.pow(2, c.matches - 1));
//console.log(points);

const sum = points.reduce((a, b) => a + b);
console.log(sum);

// Part 2
cards.forEach(c => c.count = 1);
cards.forEach((x, i) =>
    cards
        .slice(i + 1, i + 1 + x.matches)
        .forEach(y => y.count += x.count)
);
const count = cards.map(x => x.count).reduce((a, b) => a + b);
console.log(count);
