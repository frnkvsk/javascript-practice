const Mean = require("./mean").Mean;
const ExpressError = require("./expressError").ExpressError;

describe("test mode", function() {

  test("test with integer number mean args", function() {
    let m = new Mean("nums=1,2,3,4,5");
    let text = m.getMean();
    expect(text).toMatch("3");
  });

  test("test with float number mean args", function() {
    let m = new Mean("nums=1,2,3,4,5,6");
    let text = m.getMean();
    expect(text).toMatch("3.5");
  });

  test("test with single count args", function() {
    let m = new Mean("nums=1");
    let text = m.getMean();
    expect(text).toMatch("1");
  });

  test("test NaN args", function() {
    let m = new Mean("nums=1,2,3,4t,5,6");
    function testNaN() {
      m.getMean();
    }
    expect(testNaN).toThrowError(new ExpressError("4t is not a number", 400));
  });

  test("test empty args", function() {
    let m = new Mean("nums=");
    function testEmpty() {
      m.getMean();
    }
    expect(testEmpty).toThrowError(new ExpressError("Number is required", 400));
  });
  
});