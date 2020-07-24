const db = require("../db");
const Book = require("../models/book");

describe("test Book class", () => {
  const testBook1 = {
    "isbn": "1234567890",
    "amazon_url": "http://a.co/abcPtX2",
    "author": "Test1",
    "language": "english",
    "pages": 100,
    "publisher": "Springboard",
    "title": "Testing: Unlocking Hidden Testing",
    "year": 2020    
  };
  let testBook2 = "";
  beforeEach(async () => {
    await db.query("DELETE FROM books");
    testBook2 = await Book.create({
        "isbn": "0691161518",
        "amazon_url": "http://a.co/eobPtX2",
        "author": "Matthew Lane",
        "language": "english",
        "pages": 264,
        "publisher": "Princeton University Press",
        "title": "Power-Up: Unlocking Hidden Math in Video Games",
        "year": 2017
      
    });
    
  });

  test("can create with valid book data", async () => {
    let b = await Book.create(testBook1);
    expect(b.isbn).toBe(testBook1.isbn);
  });

  test("can update with valid book data", async () => {
    testBook2.author = "testAuthor"
    let b = await Book.update(testBook2.isbn, testBook2);    
    expect(b.author).toBe(testBook2.author);
  });

  test("can remove with valid book data", async () => {
    let b = await Book.remove(testBook2.isbn);
    expect(b.isbn).toBe(testBook2.isbn);
  });

  afterAll(async () => {
    await db.end();
  });

});