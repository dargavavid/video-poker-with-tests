const valuePatterns = {
    pair: "aabcd",
    twopairs: "aabbc",
    threeofakind:"aaabc",
    straight: "abcde",
    fullhouse: "aaabc",
    poker: "aaaab"
};

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

//Order duplicates in desc order, non-duplicates in asc order.
function orderElements(elements) {
    const orderedDuplicates = getDuplicates(elements).sort().reverse();
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

