//FUNCTIONS
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

//Create function to shuffle deck (doesn't modify original deck):
function shuffleDeck(d) {
    const deck = [...d];
    let randIndex;
    for (let i = 0; i < deck.length; i++) {
        randIndex = Math.floor(Math.random() * (deck.length - i) + i);
        [deck[i], deck[randIndex]] = [deck[randIndex], deck[i]];//Swap cards.
    }
    return deck;
}

//Pick five cards from deck from specified point, picks from index 0 by default.
function pickHand(deck, start = 0, end = 5) {
    return deck.slice(start, end);
}

//Create function to calculate reward for given hand.
function calcReward(hand, wagered, mTable) {
    return mTable[hand] * wagered;
}

//Create function to simulate round.
function simulateRound(deck = createDeck(cardValues, suiteValues, cardNames, suiteNames)) {
    const shuffled = shuffleDeck(deck);
    const hand = pickHand(shuffled);
    const handValue = getHandValue(hand);
    const reward = calcReward(handValue, app.state.moneyWagered, multiplierTable);
    return reward;
}

//GLOBAL VARIABLES AND FUNCTIONS RELATED TO VISUALS
const handOrder = {
    "nothing": 0,
    "onepair": 1,
    "twopairs": 2,
    "threeofakind": 3,
    "straight": 4,
    "flush": 5,
    "fullhouse": 6,
    "poker": 7,
    "straightflush": 8,
    "royalflush": 9
};

const multiplierTable = {
    "nothing": 0,
    "onepair": 1,
    "twopairs": 2,
    "threeofakind": 3,
    "straight": 4,
    "flush": 6,
    "fullhouse": 9,
    "poker": 25,
    "straightflush": 50,
    "royalflush": 250
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

const app = {
    canvas: document.querySelector("#canvas"),
    ctx: this.canvas.getContext("2d"),
    cardDivs: document.querySelectorAll(".card"),
    deck: createDeck(cardValues, suiteValues, cardNames, suiteNames),
    hand: [],
    displayCards: [],
    settings: {
        maxCardValue: 14,
        rollAnimDuration: 1000,
    },
    state: {
        moneyWagered: 1,
        rollStartDate: null,
        isRolling: false,
        movedCardsOut: false,
        movedCardsIn: false,
    },
};

function getCurrentDate() {
    return Date.now();
}

function setRoundStartDate() {
    app.state.rollStartDate = getCurrentDate();
}

function toggleCardHideShow() {
    app.cardDivs.forEach(cardDiv => {
        cardDiv.classList.toggle("cardHide");
        cardDiv.classList.toggle("cardShow");
    });
}

function setCardDivValues(values) {
    for (let i = 0; i < values.length; i++) {
        app.cardDivs[i].innerText = values[i];
    }
}

function detectAnimationEnd(start, duration) {
    const now = getCurrentDate();
    if (now - duration > start) {
        return true;
    }else {
        return false;
    }
}

function animateCardsInOut() {
    const now = getCurrentDate();
    const currentDuration = now - app.state.rollStartDate;
    if (!app.state.movedCardsOut && currentDuration <= app.settings.rollAnimDuration/2) {
        toggleCardHideShow();
        app.state.movedCardsOut = true;
    }
    if (!app.state.movedCardsIn && currentDuration >= app.settings.rollAnimDuration/2) {
        toggleCardHideShow();
        app.state.movedCardsIn = true;
        setCardDivValues(app.hand.map(cardObj => cardObj.value));
    }
    if (detectAnimationEnd(app.state.rollStartDate, app.settings.rollAnimDuration)) {
        app.state.isRolling = false;
    }
}

function roll() {
    if (!app.state.isRolling) {
        app.state.rollStartDate = getCurrentDate();
        app.state.movedCardsOut = false;
        app.state.movedCardsIn = false;
        app.state.isRolling = true;

        app.deck = shuffleDeck(app.deck);
        app.hand = pickHand(app.deck);
        
    }else {
        console.log("still rolling");
    }
}

function replaceSelectedCards(hand, selected, deck) {
    const remainingHand = substractArrays(hand, selected);
    const remainingDeck = [selected, ...deck.slice(5)];
    const remainingDeckShuffled = shuffleDeck(remainingDeck);
    const newCards = pickHand(remainingDeckShuffled, 0, selected.length);
    const newHand = [...remainingHand, ...newCards];
    return newHand;
}

function mainLoop(time = 0) {
    window.requestAnimationFrame(mainLoop);
    if (app.state.isRolling) {
        animateCardsInOut();
    }
}

mainLoop();
// function createDisplayCards(canvas, n = 5) {
//     const displayCards = [];
//     const horizontalGap = 10, verticalGap = 50;
//     const cardWidth = (canvas.width - (n + 1) * horizontalGap) / n;
//     const cardHeight = canvas.height - verticalGap * 2;
//     let currentX = horizontalGap, currentY = verticalGap;
//     let displayCard;
//     for (let i = 0, vy = 10; i < n; i++, vy += 1) {
//         displayCard = new DisplayCard(0, 0, 0, currentX, currentY, cardWidth, cardHeight, 0, vy);
//         displayCards.push(displayCard);
//         currentX += horizontalGap + cardWidth;
//     }
//     return displayCards;
// }

// function renderDisplayCards(canvas, context) {
//     const displayCards = createDisplayCards(canvas);
//     displayCards.forEach(displayCard => displayCard.render(context));
// }

// function setAppDisplayCards() {
//     app.displayCards = createDisplayCards(app.canvas);
// }

// function renderAppDisplayCards() {
//     app.displayCards.forEach(displayCard => displayCard.render(app.ctx));
// }

// function moveAppDisplayCards() {
//     app.displayCards.forEach(displayCard => displayCard.move());
// }

// function clearCanvas(canvas, context) {
//     context.clearRect(0, 0, canvas.width, canvas.height);
// }

// function mainLoop(time = 0) {
//     window.requestAnimationFrame(mainLoop);
//     clearCanvas(app.canvas, app.ctx);
//     renderAppDisplayCards();
//     moveAppDisplayCards();
// }

// function initApp(delay = 500) {
//     setTimeout(function() {
//         setAppDisplayCards();
//         mainLoop();
//     }, delay);
// }


// initApp();