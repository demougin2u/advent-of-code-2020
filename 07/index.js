const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

const formattedInput = Object.fromEntries(
    input.split('\n').map(row => {
        const [ bagColor, content ] = row.split('bags contain').map(value => value.trim());
        const formattedBagColor = bagColor.replaceAll(' ', '_');
        let formattedContent = [];
        if (!content.startsWith('no other bags')) {
            formattedContent = content.split(', ').map(rawItem => {
                rawItem = rawItem.replaceAll(/bags?\.?/g, '').trim();
                const [quantity, ...bagColorRaw] = rawItem.split(' ');
                return [
                    bagColorRaw.join('_'),
                    parseInt(quantity)
                ]
            });
        }

        return [formattedBagColor, Object.fromEntries(formattedContent)];
    })
);

const isContainingAlmostOne = (bagsDescriptions, bagColor, searchedBagColor) => {
    const bag = bagsDescriptions[bagColor];
    return !!bag[searchedBagColor] || Object.keys(bag).some(bagContained => isContainingAlmostOne(bagsDescriptions, bagContained, searchedBagColor));
};

const one = (bagsDescriptions, searchedBag) => Object.keys(bagsDescriptions).reduce(
    (count, bagColor) => count + (isContainingAlmostOne(bagsDescriptions, bagColor, searchedBag) ? 1 : 0),
    0
);

const countAllBags = (bagsDescriptions, bag) => Object.keys(bag).reduce(
    (count, bagType) => count + bag[bagType] + bag[bagType] * countAllBags(bagsDescriptions, bagsDescriptions[bagType]) || 1,
    0
);

const two = (bagsDescriptions, searchedBag) => countAllBags(bagsDescriptions, bagsDescriptions[searchedBag]);

console.log(one(formattedInput, 'shiny_gold'));
console.log(two(formattedInput, 'shiny_gold'));