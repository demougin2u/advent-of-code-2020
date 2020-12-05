const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
const rowInput = input.split('\n');

const one = rowInput => {
    const listValidPasswords = rowInput.filter(row => {
        //9-10 l: llmllllllv
        let [times, letter, password] = row.split(' ');
        const [min, max] = times.split('-').map(value => parseInt(value));
        letter = letter.slice(0, 1);

        const numberOfOccurence = password.split(letter).length - 1;
        return numberOfOccurence >= min && numberOfOccurence <= max;
    });

    return listValidPasswords.length;
};

const two = rowInput => {
    const listValidPasswords = rowInput.filter(row => {
        let [times, letter, password] = row.split(' ');
        letter = letter.slice(0, 1);
        const arrayPassword = password.split('');
        const [x, y] = times.split('-').map(value => arrayPassword[parseInt(value) - 1]);

        return x !== y && (x === letter || y === letter);
    });

    return listValidPasswords.length;
};

console.log(one(rowInput));
console.log(two(rowInput));