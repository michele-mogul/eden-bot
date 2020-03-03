import Tarrot from "./services/Tarrot";
import Esagrams from "./services/Esagrams";
const TelegramBot = require('node-telegram-bot-api');


// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_KEY;
const bot = new TelegramBot(token, {polling: true});

Esagrams.init(bot);
Tarrot.init(bot);
