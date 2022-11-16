// const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.post('/', (req, res) => {
  res.send('Hello POST by noomerZx')
});

// Expose Express API as a single Cloud Function:
exports.hello = functions.https.onRequest(app);