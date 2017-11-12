class Test {
    handleTypeError(name, expectedType, actualType) {
        throw new Error(`${name} must be of ${expectedType} type, instead you provided: ${actualType}`);
    }
    //Create function to turn value/object into string and return the string representation.
    stringify(object) {
        return JSON.stringify(object);
    }
    //Create function to evaluate a boolean expression, if it's true, return true,
    //if it's not true, log a fail message (provided or default) and trace back the failed expectation.
    //If it's not a boolean expression, throw an error.
    expect(expression = true, failMsg = "") {
        const expressionType = typeof expression;
        if (expressionType === "boolean") {
            if (expression) {
                return true;
            } else {
                const failMsgType = typeof failMsg;
                if (failMsgType === "string") {
                    if (failMsg) {//If custom fail message has been provided.
                        console.trace(failMsg);
                    } else {
                        console.trace("Expectation failed!");
                    }
                } else {
                    this.handleTypeError("Fail message", "string", failMsgType);
                }
                return false;
            }
        } else {
            this.handleTypeError("Expression", "boolean", expressionType);
        }
    }
    //Create function to check strict equality between two values.
    //If they are equal log a success message (plus custom message if provided) and return true.
    //If not, log fail message (plus custom message if provided) and trace back failed assertion, return false.
    assertEquals(actual, expected, customMessage = "") {
        const customMessageType = typeof customMessage;
        if (customMessageType !== "string") {
            this.handleTypeError("Custom message", "string", customMessageType);
        }
        if (actual === expected) {
            console.log("Assertion passed! --> " + customMessage);
            return true;
        } else {
            console.trace("Assertion passed! --> " + customMessage);
            return false;
        }
    }
    //Create function to check strict inequality between two values.
    //If they are not equal log a success (plus custom message if provided) message and return true.
    //If they are equal, log fail message (plus custom message if provided) and trace back failed assertion, return false.
    assertNotEquals(actual, expected, customMessage = "") {
        const customMessageType = typeof customMessage;
        if (customMessageType !== "string") {
            this.handleTypeError("Custom message", "string", customMessageType);
        }
        if (actual !== expected) {
            console.log("Assertion passed! --> " + customMessage);
            return true;
        } else {
            console.trace("Assertion passed! --> " + customMessage);
            return false;
        }
    }
    //Create function to check whether the two values/objects are equal (but not necessarily identical/same instance).
    //Use inspect method to stringify them, then compare strings.
    //If the string representations are the same log success (plus custom message if provided) message and return true.
    //If they are not equal, log fail message (plus custom message if provided) and trace back failed assertion, return false.
    assertSimilar(actual, expected, customMessage = "") {
        const customMessageType = typeof customMessage;
        if (customMessageType !== "string") {
            this.handleTypeError("Custom message", "string", customMessageType);
        }
        const actualStringified = this.stringify(actual);
        const expectedStringified = this.stringify(expected);
        if (actualStringified === expectedStringified) {
            console.log("Assertion passed! --> " + customMessage);
            return true;
        } else {
            console.trace("Assertion passed! --> " + customMessage);
            return false;
        }
    }
    //Create function to check whether the two values/objects are not equal.
    //Use inspect method to stringify them, then compare strings.
    //If the string representations are not the same log success (plus custom message if provided) message and return true.
    //If they are equal, log fail message (plus custom message if provided) and trace back failed assertion, return false.
    assertNotSimilar(actual, expected, customMessage = "") {
        const customMessageType = typeof customMessage;
        if (customMessageType !== "string") {
            this.handleTypeError("Custom message", "string", customMessageType);
        }
        const actualStringified = this.stringify(actual);
        const expectedStringified = this.stringify(expected);
        if (actualStringified !== expectedStringified) {
            console.log("Assertion passed! --> " + customMessage);
            return true;
        } else {
            console.trace("Assertion passed! --> " + customMessage);
            return false;
        }
    }
    //Add function to describe a group of assertions/tests.
    //Return true if all tests passed.
    it(message = "", assertions = []) {
        const messageType = typeof message;
        const assertionsType = assertions.constructor.name;
        if (messageType !== "string") {
            this.handleTypeError("Message", "string", messageType);
        }
        if (assertionsType !== "Array") {
            this.handleTypeError("Assertions", "Array", assertionsType);
        }
        const successfulAssertions = assertions.filter(assertion => assertion === true);
        console.log(`${message}: ${successfulAssertions.length} of ${assertions.length} tests passed (${(successfulAssertions.length / assertions.length) * 100}%)`);
        return assertions.length === successfulAssertions.length ? true : false;
    }
}