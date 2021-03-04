const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Express Setup
const app = express();
const cookieParser = require('cookie-parser'); // cookie handling 

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// app.use(express.static('public'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
    console.log(`The server has been started on PORT:${PORT}`)
);

// mongoose setup
mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    (err) => {
        if (err) throw err;
        console.log('Mongodb Connected...');
    }
);

// Routes setup
app.use('/api/users', require('./routes/api/user'));  // users routes
app.use('/api/google', require('./routes/api/google_login'));  // google routes
