class Tester {
    constructor() {
        this.currentResults = [];
    }
    stringify(val) {
        return JSON.stringify(val);
    }
    test(msg, fn) {
        this.currentResults = [];
        
        fn();

        this.logCurrentResults(msg);
    }
    logCurrentResults(msg) {
        const passed = this.currentResults.filter(result => result.passed);
        const failed = this.currentResults.filter(result => !result.passed);
        
        console.log(`${msg}: ${passed.length} out ${this.currentResults.length} tests passed! (${(passed.length/this.currentResults.length*100).toFixed(2)}%)`);
        failed.forEach(fail => {
            console.log(fail.msg , ": ", fail.trace);
        });
        // console.log("");
    }
    expect(statement, msg = "Expectation failed!") {
        const result = {};
        result.passed = statement ? true : false;
        result.msg = statement ? "" : msg;
        result.trace = statement ? "" : new Error;
        this.currentResults.push(result);
    }
    assertEquals(actual, expected, msg = "") {
        const result = {};
        result.passed = actual === expected ? true : false;
        result.msg = `Expected: ${expected}, instead got: ${actual}! ${msg}`;
        result.trace = actual === expected ? "" : new Error;
        this.currentResults.push(result);
    }
    assertNotEquals(actual, expected, msg = "") {
        const result = {};
        result.passed = actual !== expected ? true : false;
        result.msg = msg;
        result.trace = actual !== expected ? "" : new Error;
        this.currentResults.push(result);
    }
    assertSimilar(actual, expected, msg = ""){
        this.assertEquals(this.stringify(actual), this.stringify(expected), msg);
    }
    assertNotSimilar(actual, expected, msg = ""){
        this.assertNotEquals(this.stringify(actual), this.stringify(expected), msg);
    }
}