const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// const db = require('./app/db/index');

const app = express();

//untuk eksekusi database
// (async()=>{
//     await db.sync();
// })();

//router
const userklinikRouter = require('./app/api/v1/userKlinik/router');
const pasienRouter = require('./app/api/v1/pasien/router');

const v1 = '/api/v1/cms';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to API SIMKI",
    })
});

app.use(v1, userklinikRouter);
app.use(v1, pasienRouter);

module.exports = app;
