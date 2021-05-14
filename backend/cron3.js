require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken")
const fs = require('fs');
//const auth = require('./authorization');
var cors = require('cors');
const nodemailer = require('nodemailer');
const cryptoRandomString = require('crypto-random-string');
const NodeTable = require("nodetable");
const {format} = require('util');
const projectId = 'kka-pj-282016'
const {Storage} = require('@google-cloud/storage');
const keyFilename = './creds.json'
const storage = new Storage({projectId, keyFilename});
const Multer = require('multer');
var Api2Pdf = require('api2pdf'); 
var handlebars = require('handlebars');
var moment = require('moment');
var a2pClient = new Api2Pdf('00f9d74d-3c00-4b51-8777-73b716f0a96b');
const app = express();
const request = require('request');
const rp = require('request-promise');
app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
const connection = require('./database');
var bcrypt = require('bcrypt');
const saltRounds = 10;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "personals768@gmail.com",
    pass: "personals2021$@#",
  },
});
  
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});
const bucket = storage.bucket('medicode-staging');
const axios = require('axios');

//UTILS
var readHTMLFile = function(path, callback) {
  fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
      if (err) {
          throw err;
          callback(err);
      }
      else {
          callback(null, html);
      }
  });
};




axios.get('https://backend.enigmedsvcs.com/development/crons3')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });