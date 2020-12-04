const fs = require('fs');
const path = require('path');

const passportRegex = /([a-z]{3}):([^\s\n]+)/g;
const formatPassport = passport => {
    const matchs = Array.from(passport.matchAll(passportRegex));
    return Object.fromEntries(matchs.map(match => [match[1], match[2]]));
}
const formatInput = input => input.split('\n\n').map(formatPassport);

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
const passports = formatInput(input);

const mandatoriesKeys = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid',
];
const isValidPassport = passport => mandatoriesKeys.every(mandatoryKey => passport[mandatoryKey] !== undefined)

const one = passports => passports.filter(isValidPassport).length;
const two = input => console.log('two');


console.log(one(passports));
// // console.log(two(matrix, [
// //     [1, 1],
// //     [3, 1],
// //     [5, 1],
// //     [7, 1],
// //     [1, 2],
// // ]));
