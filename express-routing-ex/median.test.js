const Median = require("./median").Median;
const ExpressError = require("./expressError").ExpressError;

describe("test median", function() {

  test("test odd count args", function() {
    let m = new Median("nums=1,2,3,4,5");
    let text = m.getMedian();
    expect(text).toMatch("3");
  });

  test("test even count args", function() {
    let m = new Median("nums=1,2,3,4,5,6");
    let text = m.getMedian();
    expect(text).toMatch("3.5");
  });

  test("test single count args", function() {
    let m = new Median("nums=1");
    let text = m.getMedian();
    expect(text).toMatch("1");
  });

  test("test NaN args", function() {
    let m = new Median("nums=1,2,3,4t,5,6");
    function testNaN() {
      m.getMedian();
    }
    expect(testNaN).toThrowError(new ExpressError("4t is not a number", 400));
  });

  test("test empty args", function() {
    let m = new Median("nums=");
    function testEmpty() {
      m.getMedian();
    }
    expect(testEmpty).toThrowError(new ExpressError("Number is required", 400));
  });
  
});