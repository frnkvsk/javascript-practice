const db = require("../db");
const Book = require("../models/book");

describe("test Book class", () => {
  const testBook1 = {
    "book": {
      "isbn": "1234567890",
      "amazon-url": "http://a.co/abcPtX2",
      "author": "Test1",
      "language": "english",
      "pages": 100,
      "publisher": "Springboard",
      "title": "Testing: Unlocking Hidden Testing",
      "year": 2020
    }
  };
  let testBook2 = "";
  beforeEach(async () => {
    await db.query("DELETE FROM books");
    testBook2 = await Book.create({
        "isbn": "0691161518",
        "amazon-url": "http://a.co/eobPtX2",
        "author": "Matthew Lane",
        "language": "english",
        "pages": 264,
        "publisher": "Princeton University Press",
        "title": "Power-Up: Unlocking Hidden Math in Video Games",
        "year": 2017
      
    });
    
  });

  test("can create with valid book data", async () => {
    let b = await Book.create(testBook1.book);
    expect(b.isbn).toBe(testBook1.book.isbn);
  });

  test("can create with INVALID book data", async () => {
    let testBook3 = Object.assign({}, testBook1.book);
    testBook3.author = 100;
    testBook3.isbn = "0987654321"; 
    testBook3.amazon_url = "abc";
    // testBook3.pages = "abc";

    let b = await Book.create(testBook3);
    console.log('b => ',b)
    console.log("testBook1 => ",testBook1)
    expect(b.isbn).toBe(testBook3.isbn);
  });


  afterAll(async () => {
    await db.end();
  });

});