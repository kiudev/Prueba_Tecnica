// Imports
const express = require("express");
const admin = require("firebase-admin");
const serviceAccount = require("./service-account.json");

// Initialize Firebase Admin with service account and database URL
admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   dbURL: "https://prueba-tecnica-894e4.firebaseio.com",
});

// Get instance of Firestore Database
const db = admin.firestore();

// Get collection and doc
const booksCollection = db.collection("books");

// Create an express app and give a port number
const app = express();
const port = 3000;

app.use(express.json());

// Endpoint to get all books from database to client
app.get("/books", async (req, res) => {
   try {
      const booksRef = await booksCollection.get();
      const books = [];

      booksRef.forEach(doc => {
         books.push({...doc.data(), id: doc.id});
      });

      return res.json(books);
   } catch (err) {
      console.error("Error receiving a book: ", err);
   }
});

// Endpoint to get a specific book by its id from database to client
app.get("/books/:id", async (req, res) => {
   try {
      const bookRef = booksCollection.doc(req.params.id);
      const book = await bookRef.get();

      return res.json(book.data());
   } catch (err) {
      console.error("Error receiving a book by its id: ", err);
   }
});

// Endpoint to create a new book with the values received from client to database
app.post("/books", async (req, res) => {
   try {
      const values = {
         title: req.body.title,
         synopsis: req.body.synopsis,
         author: req.body.author,
         genre: req.body.genre,
         year: req.body.year,
      };

      const bookRef = booksCollection.doc();
      const newBook = await bookRef.set(values);

      const bookId = newBook.id;

      return res.json({ message: "Book created successfully", id: bookId });
   } catch (err) {
      console.error("Error creating a book: ", err);
   }
});

// Endpoint to update a book by its id from client to database
app.put("/books/:id", async (req, res) => {
   try {
      const values = {
         title: req.body.title,
         synopsis: req.body.synopsis,
         author: req.body.author,
         genre: req.body.genre,
         year: req.body.year,
      };

      const bookRef = booksCollection.doc(req.params.id);
      const updatedBook = await bookRef.set(values);

      const bookId = updatedBook.id;

      return res.json({ message: "Book updated successfully", id: bookId });
   } catch (err) {
      console.error("Error updating a book: ", err);
   }
});

// Endpoint to delete a book by its id from client to database
app.delete("/books/:id", async (req, res) => {
   try {
      const bookRef = booksCollection.doc(req.params.id);
      const deletedBook = await bookRef.delete();

      return res.json(deletedBook);
   } catch(err) {
      console.error("Error deleting a book: ", err)
   }
})

app.listen(port, () => {
   console.log("Connected to server");
});
