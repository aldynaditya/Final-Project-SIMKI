const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./app/db');

const app = express();

// ini untuk sync database

const DataPasien = require('./app/api/v1/dataPasien/model');
const Appointment = require('./app/api/v1/appointment/model');
const Schedule = require('./app/api/v1/schedule/model');
const Pasien = require('./app/api/v1/pasien/model');
const emrpasien = require('./app/api/v1/emrPasien/model');
const episode = require('./app/api/v1/episode/model');
const UserKlinik = require('./app/api/v1/userKlinik/model');
const superuser = require('./app/api/v1/superUser/model');
const pasien = require('./app/api/v1/pasien/model');

// db.sync().then(() => {
//     console.log('Database synchronized');
// }).catch(err => {
//     console.error('Database synchronization error:', err);
// });
// (async()=>{
//     await db.sync({force:true, match: /.(?<!super_user|user_klinik|pasien|data_pasien)$/}); 
// })();
// (async()=>{
//     await episode.sync({ force: true }); 
// })();
// (async()=>{
//     await Appointment.sync({ force: true }); 
// })();
// (async()=>{
//     await Pasien.sync({ force: true }); 
// })();
// (async()=>{
//     await Schedule.sync({ force: true }); 
// })();

//router
const SuperUserRouter = require('./app/api/v1/superUser/router');
const authRouter = require('./app/api/v1/auth/router');
const obatRouter = require('./app/api/v1/obat/router');
const itemRouter = require('./app/api/v1/item/router');
const pasienRouter = require('./app/api/v1/pasien/router');
const scheduleRouter = require('./app/api/v1/schedule/router');
const appointmentRouter = require('./app/api/v1/appointment/router');
const datapasienRouter = require('./app/api/v1/dataPasien/router');
const emrpasienRouter = require('./app/api/v1/emrPasien/router');

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
app.use(`${v1}/cms`, appointmentRouter);
app.use(`${v1}/cms`, datapasienRouter);
app.use(`${v1}/cms`, emrpasienRouter);
app.use(`${v1}`, pasienRouter);


//use middleware
app.use(notFoundMiddleware);
app.use(handlerErrorMiddleware);


module.exports = app;
