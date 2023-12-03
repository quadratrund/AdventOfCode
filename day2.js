const { readFileSync } = require('fs');

const buffer = readFileSync('input-a2.txt');
const text = buffer.toString('utf8').split('\n').filter(Boolean);

const maxValues = { red: 12, green: 13, blue: 14 };

//console.log(text);
const games = text.map(line => {
	let [id, sets] = line.substr(5).split(':');
	id = Number(id);
	sets = sets.split(';').map(x =>
		x.split(',').map(y => y.trim().split(' ')).map(([a, b]) => [b, Number(a)])
	).map(x => Object.fromEntries(x));
	const minValues = Object.fromEntries(['red', 'green', 'blue']
		.map(color => [color, Math.max(...sets.map(x => x[color] ?? 0))])
	);
	const power = minValues.red * minValues.green * minValues.blue;
	return {id, sets, minValues, power};
});
//console.log(games);
//console.log(games.map(x => x.sets));

const possibleGames = games.filter(({ sets }) => sets.every(x => (x.red ?? 0) <= maxValues.red && (x.green ?? 0) <= maxValues.green && (x.blue ?? 0) <= maxValues.blue));
//console.log(possibleGames);
const sum1 = possibleGames.map(({id}) => id).reduce((a, b) => a + b);
console.log(sum1);

const sum2 = games.map(x => x.power).reduce((a, b) => a + b);
console.log(sum2);
