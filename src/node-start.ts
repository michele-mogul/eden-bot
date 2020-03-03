import Tarrot from "./services/Tarot";
import Esagrams from "./services/Esagrams";
import TelegramBot from "node-telegram-bot-api";

// replace the value below with the Telegram token you receive from @BotFather
// @ts-ignore
const token = process.env.TELEGRAM_KEY || "";
const bot = new TelegramBot(token, { polling: true });

Esagrams.init(bot);
Tarrot.init(bot);
