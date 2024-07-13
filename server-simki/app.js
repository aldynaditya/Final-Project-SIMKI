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
const Episode = require('./app/api/v1/episode/model');
const UserKlinik = require('./app/api/v1/userKlinik/model');
const pasien = require('./app/api/v1/pasien/model');
const Obat = require('./app/api/v1/obat/model');
const Item = require('./app/api/v1/item/model');
const SuratSakit = require('./app/api/v1/suratSakit/model');
const SuratRujukan = require('./app/api/v1/suratRujukan/model');
const OrderObat = require('./app/api/v1/orderObat/model');
const OrderSurat = require('./app/api/v1/orderSurat/model');
const OrderProsedur = require('./app/api/v1/orderProsedur/model');
const Transaksi = require('./app/api/v1/transaksi/model');
const Question = require('./app/api/v1/kuisioner/question/model');
const Response = require('./app/api/v1/kuisioner/responses/model');


// db.sync().then(() => {
//     console.log('Database synchronized');
// }).catch(err => {
//     console.error('Database synchronization error:', err);
// });

// (async()=>{
//     await Transaksi.sync({force:true}); 
// })();
// (async()=>{
//     await Response.sync({force:true}); 
// })();

//router
const userklinikRouter = require('./app/api/v1/userKlinik/router');
const authRouter = require('./app/api/v1/auth/router');
const obatRouter = require('./app/api/v1/obat/router');
const itemRouter = require('./app/api/v1/item/router');
const suratRouter = require('./app/api/v1/suratSakit/router');
const pasienRouter = require('./app/api/v1/pasien/router');
const scheduleRouter = require('./app/api/v1/schedule/router');
const appointmentRouter = require('./app/api/v1/appointment/router');
const datapasienRouter = require('./app/api/v1/dataPasien/router');
const emrpasienRouter = require('./app/api/v1/emrPasien/router');
const orderRouter = require('./app/api/v1/order/router');
const orderobatRouter = require('./app/api/v1/orderObat/router');
const orderprosedurRouter = require('./app/api/v1/orderProsedur/router');
const ordersuratRouter = require('./app/api/v1/orderSurat/router');
const transaksiRouter = require('./app/api/v1/transaksi/router');
const kuisionerRouter = require('./app/api/v1/kuisioner/router');

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
app.use(`${v1}/cms`, userklinikRouter);
app.use(`${v1}/cms`, authRouter);
app.use(`${v1}/cms`, obatRouter);
app.use(`${v1}/cms`, itemRouter);
app.use(`${v1}/cms`, suratRouter);
app.use(`${v1}/cms`, scheduleRouter);
app.use(`${v1}/cms`, appointmentRouter);
app.use(`${v1}/cms`, datapasienRouter);
app.use(`${v1}/cms`, emrpasienRouter);
app.use(`${v1}/cms`, orderRouter);
app.use(`${v1}/cms`, orderobatRouter);
app.use(`${v1}/cms`, orderprosedurRouter);
app.use(`${v1}/cms`, ordersuratRouter);
app.use(`${v1}/cms`, transaksiRouter);
app.use(`${v1}/cms`, kuisionerRouter);
app.use(`${v1}`, pasienRouter);


//use middleware
app.use(notFoundMiddleware);
app.use(handlerErrorMiddleware);


module.exports = app;
