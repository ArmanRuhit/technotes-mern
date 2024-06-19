require('dotenv').config();
const express = require("express");
const path = require('path');
const app = express();
const {logger, logEvents} = require('./middleware/logger');
const PORT = process.env.PORT || 3500;
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConnection');
const mongoose = require('mongoose');

connectDB();
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json()); //this will help process json
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join('public'))); this will also work
app.use('/', require('./routes/root'));
app.all('*', (req, res) => {
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if(req.accepts('json')) {
        res.json({message:'404 Not Found'})
    } else {
        res.type('txt').send('404 not found');
    }
});

app.use(errorHandler);


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err);
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log');
})
