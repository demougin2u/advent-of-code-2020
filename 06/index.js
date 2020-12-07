const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

const one = input => input.split('\n\n').reduce((sum, group) => {
    const persons = group.split('\n')
    const groupAnswers = persons.map(personAnswers => personAnswers.split('')).flat();
    const filteredGroupAnswers = [...new Set(groupAnswers)]
    return sum + filteredGroupAnswers.length;
}, 0);

const two = input => input.split('\n\n').reduce((sum, group) => {
    const persons = group.split('\n')
    const groupAnswers = persons.map(personAnswers => personAnswers.split(''));
    const answersCount = new Map();
    groupAnswers.forEach(answers =>
        answers.forEach(
            answer => {
                const count = answersCount.get(answer) ?? 0;
                answersCount.set(answer, count + 1);
            }
        )
    );
    for (const numberAnswer of answersCount.values()) {
        if (numberAnswer === groupAnswers.length) {
            sum ++;
        }
    }

    return sum;
}, 0);

console.log(one(input));
console.log(two(input));