const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
const rowInput = input.split('\n');
const matrix = rowInput.map(row => row.split(''));

const one = (matrix, [x, y]) => matrix.reduce(
    (numberOfTrees, row, rowIndex) => {
        if (rowIndex > 0 && rowIndex % y > 0) {
            return numberOfTrees;
        }
        const index = (rowIndex / y) * x % row.length;
        return numberOfTrees + (row[index] === '#' ? 1 : 0);
    },
    0
);

const two = (matrix, slopes) => slopes.reduce((multipliedTrees, slope) => multipliedTrees * one(matrix, slope), 1);

console.log(one(matrix, [3, 1]));
console.log(two(matrix, [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
]));