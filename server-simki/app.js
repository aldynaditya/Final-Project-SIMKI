const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./app/db');

const app = express();

// db.sync().then(() => {
//     console.log('Database synchronized');
// }).catch(err => {
//     console.error('Database synchronization error:', err);
// });
// const Appointment = require('./app/api/v1/appointment/model');
// const Schedule = require('./app/api/v1/schedule/model');
// const Pasien = require('./app/api/v1/pasien/model');
// (async()=>{
//     await db.sync({force:true}); 
// })();



//router
const SuperUserRouter = require('./app/api/v1/superUser/router');
const authRouter = require('./app/api/v1/auth/router');
const obatRouter = require('./app/api/v1/obat/router');
const itemRouter = require('./app/api/v1/item/router');
const pasienRouter = require('./app/api/v1/pasien/router');
const scheduleRouter = require('./app/api/v1/schedule/router');

const v1 = '/api/v1';

const notFoundMiddleware = require('./app/middleware/not-found');
const handlerErrorMiddleware = require('./app/middleware/handler-error');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to API SIMKI",
    })
});

//use router
app.use(`${v1}/cms`, SuperUserRouter);
app.use(`${v1}/cms`, authRouter);
app.use(`${v1}/cms`, obatRouter);
app.use(`${v1}/cms`, itemRouter);
app.use(`${v1}/cms`, scheduleRouter);
app.use(`${v1}`, pasienRouter);


//use middleware
app.use(notFoundMiddleware);
app.use(handlerErrorMiddleware);


module.exports = app;
