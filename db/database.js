// src/db/databse.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const DB_URL = 'mongodb+srv://<dbuser>:<dbpassword>@<MongoDB_URI>';

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('open', () => {
  console.log('MongoDB connected Successfully!')
});