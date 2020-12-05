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

const regexFourDigits = /^\d{4}$/;

const fieldsRules = {
    byr: value => {
        // byr(Birth Year) - four digits; at least 1920 and at most 2002.
        if (!regexFourDigits.test(value)) {
            return false;
        }
        const intValue = parseInt(value);
        return intValue >= 1920 && intValue <= 2002;
    },
    iyr: value => {
        // iyr(Issue Year) - four digits; at least 2010 and at most 2020.
        if (!regexFourDigits.test(value)) {
            return false;
        }
        const intValue = parseInt(value);
        return intValue >= 2010 && intValue <= 2020;
    },
    eyr: value => {
        // eyr(Expiration Year) - four digits; at least 2020 and at most 2030.
        if (!regexFourDigits.test(value)) {
            return false;
        }
        const intValue = parseInt(value);
        return intValue >= 2020 && intValue <= 2030;
    },
    hgt: value => {
        // hgt(Height) - a number followed by either cm or in:
            // If cm, the number must be at least 150 and at most 193.
            // If in, the number must be at least 59 and at most 76.
        const match = value.match(/^(\d+)(cm|in)$/);
        if (!Array.isArray(match)) {
            return false;
        }

        const [ intValue, unit ] = [ parseInt(match[1]), match[2] ];
        return unit === 'cm' ? (intValue >= 150 && intValue <= 193) : (intValue >= 59 && intValue <= 76);
    },
    // hcl(Hair Color) - a # followed by exactly six characters 0 - 9 or a - f.
    hcl: value => /^#[a-zA-Z0-9]{6}$/.test(value),

    // ecl(Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
    ecl: value => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].some(authorizedValue => authorizedValue === value),

    // pid(Passport ID) - a nine - digit number, including leading zeroes.
    pid: value => /^[0-9]{9}$/.test(value)
};

const isContainingAllMandatoriesField = passport => Object.keys(fieldsRules).every(key => passport[key] !== undefined)
const isValidPassport = passport => Object.entries(fieldsRules).every(([key, test]) => test(passport[key]))

const one = passports => passports.filter(isContainingAllMandatoriesField).length;
const two = passports => passports.filter(isContainingAllMandatoriesField).filter(isValidPassport).length;

console.log(one(passports));
console.log(two(passports));