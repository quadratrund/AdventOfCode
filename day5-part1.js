const { readFileSync } = require('fs');

const buffer = readFileSync('input-day5.txt');
const text = buffer.toString('utf8');
const sectionsRaw = text.split('\n\n');
const seeds = sectionsRaw.shift().split(' ').slice(1).map(Number);
const sections = sectionsRaw.map(s => s
  .split('\n')
  .slice(1)
  .map(l => l.split(' ').map(Number))
  .map(([dst, src, len]) => ({ dst, src, len }))
  .sort((a, b) => b.src - a.src)
);
console.log(sections);
const locations = seeds.map(x => {
  for (const section of sections) {
    const entry = section.find(row => row.src <= x);
    if (entry && (entry.src + entry.len) > x) {
      x = x - entry.src + entry.dst;
    }
  }
  return x;
});
console.log(locations);
console.log(Math.min(...locations));