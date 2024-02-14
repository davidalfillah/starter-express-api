import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fsPromises = fs.promises;

export const logEvent = async (message) => {
    const dateTime = `${format(new Date(), 'yyyy-MM-dd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        // testing
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', 'eventLog.txt'), logItem);
    } catch (err) {
        console.log(err);
    }
}

export const logger = (req, res, next) => {
    logEvent(`${req.method}\t${req.headers.origin}\t${req.url}`, `reqLog.txt`);
    console.log(`${req.method}\t${req.path}`);
    next();
}