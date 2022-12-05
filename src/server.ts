require('dotenv').config()

import Tarrot from "./services/Tarot";
import * as TelegramBot from 'node-telegram-bot-api';

const token = process.env.TELEGRAM_KEY || false;

if(!token ){
    console.error("TELEGRAM_KEY must be set in process env");
    process.exit(1);
}

const options = {
    polling: true,
};
// @ts-ignore
const bot = new TelegramBot(token, options);

Tarrot.init(bot);


process
    .on('SIGTERM', shutdown('SIGTERM'))
    .on('SIGINT', shutdown('SIGINT'))
    .on('uncaughtException', shutdown('uncaughtException'));

setInterval(console.log.bind(console, 'tick'), 15000);

function shutdown(signal: string) {
    return (err: any) => {
        console.log(`${ signal }...`);
        if (err) console.error(err.stack || err);
        setTimeout(() => {
            console.log('...waited 5s, exiting.');
            process.exit(err ? 1 : 0);
        }, 5000).unref();
    };
}
