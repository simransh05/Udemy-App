const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require('mongoose')
const cookies = require('cookie-parser')
const app = express();

app.use(cors({
    origin: process.env.BASE_URL, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true 
}));

app.use(cookies())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/',require('./Routes/route'))

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(4000, () => {
      console.log(`Server started on port 4000`);
    });
  })
