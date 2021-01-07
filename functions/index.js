const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express =  require('express');
const fileMiddleware =  require('express-multipart-file-parser');
const dependencies = require('./src/config/dependencies');
const cors = require('cors');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
admin.initializeApp();

console.info = functions.logger.info;
console.log = functions.logger.log;
const server = express();
server.use(fileMiddleware);
server.use(cors())
dependencies(server, admin.firestore());

exports.api = functions.https.onRequest(server);
