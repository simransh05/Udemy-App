const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require('mongoose')
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/',require('./Routes/route'))

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(4000, () => {
      console.log(`Server started on port 4000`);
    });
  })
