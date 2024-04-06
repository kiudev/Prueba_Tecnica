// Imports
const express = require("express");
const admin = require("firebase-admin");
const serviceAccount = require("./service-account.json");

// Initialize Firebase Admin SDK with service account and database URL
admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   dbURL: "https://prueba-tecnica-894e4.firebaseio.com",
});

// Get instance of Firestore Database
const db = admin.firestore();

// Get collection and doc
const booksCollection = db.collection("books");
const bookDoc = booksCollection.doc("BXOlN6xvFEgmQLaxAJkh");

const data = {
   title: "The Women: A Novel",
   description: "The Women: A Novel",
   author: "Kristin Hannah",
   genre: "Fiction"
}

async function getBookData() {
   try {
      await bookDoc.set(data);
      const getData = await bookDoc.get();
      if (getData.exists) {
         const bookData = getData.data();
         console.log(bookData);
      } else {
         console.log("No book data found");
      }
   } catch (err) {
      console.error(err);
   }
}

getBookData();

const app = express();

app.listen(3000, () => {
   console.log("Connected to backend");
});
