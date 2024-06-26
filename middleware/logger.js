const {format} = require('date-fns');
const {v4:uuid} = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async(message, logFileName) => {
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try{
        const logDirectory = path.join(__dirname, '..', 'logs');
        if(!fs.existsSync(logDirectory)){
            await fsPromises.mkdir(logDirectory);
        }

        await fsPromises.appendFile(path.join(logDirectory, logFileName), logItem);
    } catch(err){
        console.log(err);
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log');
    console.log(`${req.method} ${req.path}`);
    next();
}

module.exports = {logEvents, logger};
