const ExpressError = require("./expressError").ExpressError;
const All = require("./all").All;

describe("test all", function() {

  test("test odd count args", function() {
    let m = new All("nums=1,2,3,4,5");
    let text = m.getAll();
    expect(text.mean).toMatch("3");
    expect(text.median).toMatch("3");
    expect(text.mode).toMatch("none");
  });

  test("test even count args", function() {
    let m = new All("nums=1,2,3,4,5,6");
    let text = m.getAll();
    expect(text.mean).toMatch("3.5");
    expect(text.median).toMatch("3.5");
    expect(text.mode).toMatch("none");
  });

  test("test single count args", function() {
    let m = new All("nums=1");
    let text = m.getAll();
    expect(text.mean).toMatch("1");
    expect(text.median).toMatch("1");
    expect(text.mode).toMatch("none");
  });

  test("test NaN args", function() {
    let m = new All("nums=1,2,3,4t,5,6");
    function testNaN() {
      m.getAll();
    }
    expect(testNaN).toThrowError(new ExpressError("4t is not a number", 400));
  });

  test("test empty args", function() {
    let m = new All("nums=");
    function testEmpty() {
      m.getAll();
    }
    expect(testEmpty).toThrowError(new ExpressError("Number is required", 400));
  });
  
});