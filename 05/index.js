const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

const boardingPasses = input.split('\n').map(row => {
    const splittedRow = row.split('');
    return {
        rowPartition: splittedRow.slice(0, 7),
        columnPartition: splittedRow.slice(7)
    }
});

const calculateID = ({ partition, min, max, lowerLetter }) => partition.reduce((position, letter) => {
    if (letter === lowerLetter) {
        position.max = Math.floor(position.max - (position.max - position.min) / 2);
        position.current = position.max;
    } else {
        position.min = Math.ceil(position.min + (position.max - position.min) / 2);
        position.current = position.min;
    }

    return position;
}, { min, max, current: 0 }).current;

const calculateRowID = partition => calculateID({
    partition,
    min: 0,
    max: 127,
    lowerLetter: 'F'
});

const calculateColumnID = partition => calculateID({
    partition,
    min: 0,
    max: 7,
    lowerLetter: 'L'
});

const calculateSeatID = boardingPass => 8 * calculateRowID(boardingPass.rowPartition) + calculateColumnID(boardingPass.columnPartition);

const one = passes => Math.max(...passes.map(calculateSeatID));
const two = input => 0;

console.log(one(boardingPasses));
console.log(two(input));