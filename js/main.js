const app = {
    settings: {
        maxCardValue: 14
    }
};

const handOrder = {
    "nothing": 0,
    "pair": 1,
    "twopairs": 2,
    "threeofakind": 3,
    "straight": 4,
    "flush": 5,
    "fullhouse": 6,
    "poker": 7,
    "straightflush": 8,
    "royalflush": 9
};

const valuePatterns = {
    "abcde": "nothing",
    "aabcd": "onepair",
    "aabbc": "twopairs",
    "aaabc": "threeofakind",
    "aaabb": "fullhouse",
    "aaaab": "poker"
};

const suitePatterns = {
    "aaaaa": "flush",
    //LATER ON IMPLEMENT BONUS PATTERNS??
}

const cardValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const cardNames = ["two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "jack", "queen", "king", "ace"];
const suiteValues = [1, 2, 3, 4];
const suiteNames = ["spades", "clubs", "hearts", "diamonds"];

function createCard(value, suite, name) {
    return new Card(value, suite, name);
}

function createDeck(cardValues, suiteValues, cardNames, suiteNames) {
    const deck = [];
    let card, cardValue, suiteValue, cardName;
    for (let i = 0; i < cardValues.length; i++) {
        for (let j = 0; j < suiteValues.length; j++) {
            cardValue = cardValues[i];
            suiteValue = suiteValues[j];
            cardName = cardNames[i] + " of " + suiteNames[j];
            card = createCard(cardValue, suiteValue, cardName);
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

    //Check flush
    const isFlush = suiteValue === "flush";

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

    //Check royal flush
    if (isStraight && isFlush && highestCardValue === app.settings.maxCardValue) {
        return "royalflush";
    }else if (isStraight && isFlush) {//Check straight flush
        return "straightflush";
    }else if (isFlush) {//Check flush
        return "flush";
    }else if (isStraight) {//Check straight
        return "straight";
    }else {//Check all other proper combinations
        return handValue;
    }
}