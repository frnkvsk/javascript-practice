const Mode = require("./mode").Mode;
const ExpressError = require("./expressError").ExpressError;

describe("test mode", function() {

  test("test with one count mode args", function() {
    let m = new Mode("nums=1,2,3,4,5,3");
    let text = m.getMode();
    expect(text).toMatch("3");
  });

  test("test with mulitiple count mode args", function() {
    let m = new Mode("nums=1,2,3,4,5,6,3,2");
    let text = m.getMode();
    expect(text).toMatch("2,3");
  });

  test("test with zero count mode args", function() {
    let m = new Mode("nums=1,2,3,4,5,6");
    let text = m.getMode();
    expect(text).toMatch("none");
  });

  test("test with single count mode args", function() {
    let m = new Mode("nums=1");
    let text = m.getMode();
    expect(text).toMatch("none");
  });

  test("test NaN args", function() {
    let m = new Mode("nums=1,2,3,4t,5,6");
    function testNaN() {
      m.getMode();
    }
    expect(testNaN).toThrowError(new ExpressError("4t is not a number", 400));
  });

  test("test empty args", function() {
    let m = new Mode("nums=");
    function testEmpty() {
      m.getMode();
    }
    expect(testEmpty).toThrowError(new ExpressError("Number is required", 400));
  });
  
});