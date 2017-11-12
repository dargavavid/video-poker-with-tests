const T = new Test();

T.it("Should create card", [
    T.assertSimilar(createCard(41, 1, "ace of spades"), new Card(41, 1, "ace of spades"))
]);

T.it("Should create deck", [
    T.assertSimilar(createDeck(cardValues, suiteValues, cardNames, suiteNames).map(x => x.value).sort(), [...cardValues,...cardValues, ...cardValues, ...cardValues].sort())
]);

T.it("Should detect duplication", [
    T.assertEquals(isDuplicated(1, [1,2,1]), true),
    T.assertEquals(isDuplicated(2, [1,2,1]), false),
    T.assertEquals(isDuplicated(3, [1,2,1]), false),
]);

T.it("Should get duplicates", [
    T.assertSimilar(getDuplicates([1,1,2,2,3,4,5]), [1,1,2,2]),
    T.assertSimilar(getDuplicates([1,1,3,3,5]), [1,1,3,3]),
]);

T.it("Should count elements",[
    T.assertEquals(countElement(1, [1,1,1,2,3]), 3),
]);

T.it("Should order cards propery", [
    T.assertSimilar(orderElements([5,3,1,4,2]), [1,2,3,4,5]),
    T.assertSimilar(orderElements([1,2,3,3,4]), [3,3,1,2,4]),
    T.assertSimilar(orderElements([4,2,3,3,4]), [4,4,3,3,2]),
    T.assertSimilar(orderElements([4,3,3,3,4]), [3,3,3,4,4]),
    T.assertSimilar(orderElements([4,3,3,3,5]), [3,3,3,4,5]),
]);

T.it("Should get patterns", [
    T.assertEquals(getPattern([1,1,2,3,5]), "aabcd"),
    T.assertEquals(getPattern([1,1,1,3,5]), "aaabc"),
    T.assertEquals(getPattern([1,1,1,1,1]), "aaaaa"),
    T.assertEquals(getPattern([1,1,2,1,1]), "aabaa"),
    T.assertEquals(getPattern([1,1,2,1,3]), "aabac"),
    T.assertEquals(getPattern([1,2,3,4,5]), "abcde"),
]);

T.it("Should get hand values", [
    T.assertEquals(getHandValue([new Card(2,1), new Card(2,2), new Card(3,3), new Card(4,1), new Card(5,4)]), "onepair", "Should recognize pair"),
    T.assertEquals(getHandValue([new Card(2,1), new Card(2,2), new Card(2,3), new Card(4,1), new Card(5,4)]), "threeofakind", "Should recognize three of a kind"),
    T.assertEquals(getHandValue([new Card(2,1), new Card(2,2), new Card(4,3), new Card(4,1), new Card(5,4)]), "twopairs", "Should recognize two pairs"),
    T.assertEquals(getHandValue([new Card(2,1), new Card(1,2), new Card(1,3), new Card(1,1), new Card(2,4)]), "fullhouse", "Should recognize full house"),
    T.assertEquals(getHandValue([new Card(1,1), new Card(1,2), new Card(1,3), new Card(1,1), new Card(2,4)]), "poker", "Should recognize poker"),
    T.assertEquals(getHandValue([new Card(1,1), new Card(2,1), new Card(5,1), new Card(8,1), new Card(2,1)]), "flush", "Should recognize flush and value it over pair!"),
    T.assertEquals(getHandValue([new Card(1,1), new Card(2,1), new Card(3,1), new Card(5,1), new Card(4,2)]), "straight", "Should recognize straight!"),
    T.assertEquals(getHandValue([new Card(1,1), new Card(2,1), new Card(3,1), new Card(5,1), new Card(4,1)]), "straightflush", "Should recognize straight flush!"),
    T.assertEquals(getHandValue([new Card(10,1), new Card(11,1), new Card(12,1), new Card(13,1), new Card(14,1)]), "royalflush", "Should recognize royal flush!"),
    T.assertEquals(getHandValue([new Card(8,2), new Card(11,1), new Card(12,1), new Card(13,1), new Card(14,1)]), "nothing", "Should recognize nothing!"),
]);