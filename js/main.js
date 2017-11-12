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

function getPattern(elements) {
    const symbols = "abcde";
    let pattern = "";
    for (let i = 0, si = 0; i < elements.length; i++) {
        if (elements[i - 1] !== elements[i] && i > 0) {
            si++;
        }
        pattern += symbols[si];
    }
    return pattern;
}