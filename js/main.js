const app = {
    settings: {
        cardValueMin: 2,
        cardValueMax: 14,
        suiteValueMin: 1,
        suiteValue: 4
    }
};

const cardValues = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41];
const cardNames = ["two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "jack", "queen", "king", "ace"];
const suiteValues = [1, 2, 3, 4];
const suiteNames = ["spades", "clubs", "hearts", "diamonds"];


const valuePatterns = {
    "aabcd": "pair",
    "aabbc": "twopairs",
    "aaabc": "threeofakind",
    "aaabb": "fullhouse",
    "aaaab": "poker"
};

const suitePatterns = {
    "aaaaa": "flush",
}

function createCard(value, suite) {
    return new Card(value, suite);
}

function createDeck(values, suites) {
    const deck = [];
    let card;
    for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < suites.length; j++) {
            card = createCard(values[i], suites[j]);
            deck.push(card);
        }
    }
    return deck;
}

function isDuplicated(target, elements) {
    return elements.filter(element => element === target).length > 1;
}

function getDuplicates(elements) {
    return elements.filter(element => isDuplicated(element, elements));
}

function getNonDuplicates(elements) {
    return elements.filter(element => !isDuplicated(element, elements));
}

//Return array that only contains elements unique to arr1.
function substractArrays(arr1, arr2) {
    return arr1.filter(el => arr2.indexOf(el) === -1);
}

function countElement(element, arr) {
    return arr.filter(x => x === element).length;
}

//Order duplicates in desc order, non-duplicates in asc order.
function orderElements(elements) {
    const orderedDuplicates = getDuplicates(elements).sort((a,b) => {
        const countA = countElement(a, elements);
        const countB = countElement(b, elements);
        if (countA !== countB) {
            return countA > countB ? -1 : 1;
        }else {
            return a === b ? 0 : a > b ? -1 : 1;
        }
    });

    const orderedNonDuplicates = substractArrays(elements, orderedDuplicates).sort();
    return [...orderedDuplicates, ...orderedNonDuplicates];
}

//Turn an array of elements into string pattern, showing only similarities and differences between elements.
function getPattern(elements) {
    const symbols = "abcdefghijklmnopqrstuvwxyz";
    const usedSymbols = {};
    let pattern = "", element;
    for (let i = 0, si = 0; i < elements.length; i++) {
        element = elements[i];
        //If element has no assigned symbol yet, assign one.
        if (!usedSymbols[element]) {
            usedSymbols[element] = symbols[si];
            si++;//Increment symbol index.
        }
        pattern += usedSymbols[element];//Append pattern with corresponding symbol.
    }
    return pattern;
}

//Takes in an array of Card objects, return value of hand.
function getHandValue(hand) {
    const cardValues = hand.map(cardObj => cardObj.value);
    const cardSuites = hand.map(cardObj => cardObj.suite);
    const orderedCardValues = orderElements(cardValues);
    const highestCardValue = orderedCardValues[orderedCardValues.length - 1];

    const valuePattern = getPattern(orderedCardValues);
    const suitePattern = getPattern(cardSuites);
    const handValue = valuePatterns[valuePattern];
    const suiteValue = suitePatterns[suitePattern];

    //Check straight
    const isStraight = orderedCardValues.map((card, i, cards) => {
        if (i > 0) {
            if (cards[i - 1] + 1 === cards[i]) {
                return 1;
            }else {
                return 0;
            }
        }else {
            return 1;
        }
    }).reduce((product, x) => product *= x, 1) === 1;
    if (handValue) {
        return handValue;
    }
}