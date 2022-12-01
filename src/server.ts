import Tarrot from "./services/Tarot";
import Esagrams from "./services/Esagrams";
import * as TelegramBot from 'node-telegram-bot-api';


const url = process.env.BOT_WEBHOOK ||  false;
const token = process.env.TELEGRAM_KEY || false;
const port = process.env.PORT || false;

if(!url || !token || !port ){
    console.error("BOT_WEBHOOK, PORT and TELEGRAM_KEY must be set in process env");
    process.exit(1);
}

const options = {
    webHook: {
        port: port
    }
};
// @ts-ignore
const bot = new TelegramBot(token, options);


// This informs the Telegram servers of the new webhook.
// Note: we do not need to pass in the cert, as it already provided
bot.setWebHook(`${url}/bot${token}`).then((() => {
    Esagrams.init(bot);
    Tarrot.init(bot);
}));


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
