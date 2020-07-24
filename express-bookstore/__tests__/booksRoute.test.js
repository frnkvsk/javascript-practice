const request = require("supertest");
const app = require("../app");
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

  describe("GET /books/", () => {

    test("can get list of books", async () => {
      let response = await request(app).get(`/books/`);
      expect(response.statusCode).toBe(200);
      expect(response.body.books[0].isbn).toBe(testBook2.isbn);
    });

  });

  describe("GET /books/:id", () => {

    test("can get book by VALID id", async () => {
      let response = await request(app).get(`/books/${testBook2.isbn}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.book.isbn).toBe(testBook2.isbn);
    });

    test("can get book by INVALID id", async () => {
      let response = await request(app).get(`/books/${testBook1.isbn}`);
      expect(response.statusCode).toBe(404);
    });

  });

  describe("POST /books/", () => {

    test("can create a book by VALID book data", async () => {
      let response = await request(app).post(`/books/`)
        .send(testBook1);
      expect(response.statusCode).toBe(201);
      expect(response.body.book.isbn).toBe(testBook1.isbn);
    });

    test("can create a book by INVALID book data", async () => {
      let testBook3 = Object.assign({}, testBook1);
      testBook3.isbn = "0987654321"; 
      testBook3.pages = "abc";
      let response = await request(app).post(`/books/`)
        .send(testBook3);
      expect(response.statusCode).toBe(400);
    });

  });

  describe("PUT /books/:isbn", () => {

    test("can update a book by VALID book data", async () => {
      testBook2.author = "testAuthor";
      testBook2.pages = 200;
      let response = await request(app).put(`/books/${testBook2.isbn}`)
        .send(testBook2);
      expect(response.statusCode).toBe(201);
      expect(response.body.book.author).toBe("testAuthor");
    });

    test("can update a book by INVALID book data", async () => {
      testBook2.pages = "abc";
      let response = await request(app).put(`/books/${testBook2.isbn}`)
        .send(testBook2);
      expect(response.statusCode).toBe(400);
    });

  });

  describe("DELETE /books/:isbn", () => {

    test("can update a book by INVALID book data", async () => {
      testBook2.pages = "abc";
      let response = await request(app).delete(`/books/${testBook1.isbn}`);
      expect(response.statusCode).toBe(404);
    });

    test("can delete a book by VALID book data", async () => {
      testBook2.author = "testAuthor";
      testBook2.pages = 200;
      let response = await request(app).delete(`/books/${testBook2.isbn}`);
      expect(response.statusCode).toBe(200);
    });

  });


  afterAll(async () => {
    await db.end();
  });

});
