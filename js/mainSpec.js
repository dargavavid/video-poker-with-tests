const T = new Test();

const c1 = new Card("A", "club");
T.it("Card should have value and suite defined",[
    T.assertEquals(c1.value, "A"),
    T.assertEquals(c1.suite, "club")
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

T.it("Should order cards propery", [
    T.assertSimilar(orderElements([5,3,1,4,2]), [1,2,3,4,5]),
    T.assertSimilar(orderElements([1,2,3,3,4]), [3,3,1,2,4]),
    T.assertSimilar(orderElements([4,2,3,3,4]), [4,4,3,3,2]),
]);

T.it("Should get patterns", [
    T.assertEquals(getPattern([1,1,2,3,5]), "aabcd"),
    T.assertEquals(getPattern([1,1,1,3,5]), "aaabc"),
    T.assertEquals(getPattern([1,1,1,1,1]), "aaaaa"),
]);