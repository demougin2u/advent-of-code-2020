const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

const instructionList = input.split('\n').map(row => {
    const [ operation, argument ] = row.split(' ');

    return {
        operation,
        argument: parseInt(argument),
        isAlreadyUsed: false
    }
});


const one = instructionList => {
    let index = 0;
    let isAlreadyUsedInstruction = false;
    let instruction = null;
    let accumulator = 0;
    while (!isAlreadyUsedInstruction && index < instructionList.length) {
        instruction = instructionList[index];
        if (instruction.isAlreadyUsed) {
            return accumulator;
        }

        switch(instruction.operation) {
            case 'acc':
                accumulator += instruction.argument;
                index++;
                break;
            case 'jmp':
                index += instruction.argument;
                break;
            case 'nop':
            default:
                index ++;
                break;
        }
        instruction.isAlreadyUsed = true;
    }

    return accumulator;
};
const two = input => 0;

console.log(one(instructionList));
console.log(two(input));
