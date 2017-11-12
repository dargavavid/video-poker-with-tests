const T = new Test();

const c1 = new Card("A", "club");
T.it("Card should have value and suite defined",[
    T.assertEquals(c1.value, "A"),
    T.assertEquals(c1.suite, "club")
]);