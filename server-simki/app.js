const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./app/db');


const app = express();

// {force:true}
(async()=>{
    await db.sync(); 
})();

//router
const SuperUserRouter = require('./app/api/v1/superUser/router');
const authRouter = require('./app/api/v1/auth/router');
const obatRouter = require('./app/api/v1/obat/router');
const itemRouter = require('./app/api/v1/item/router');

const v1 = '/api/v1/cms';
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
app.use(v1, SuperUserRouter);
app.use(v1, authRouter);
app.use(v1, obatRouter);
app.use(v1, itemRouter);


//use middleware
app.use(notFoundMiddleware);
app.use(handlerErrorMiddleware);


module.exports = app;
