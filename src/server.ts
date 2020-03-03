import Tarrot from "./services/Tarot";
import Esagrams from "./services/Esagrams";
import TelegramBot from "node-telegram-bot-api";
import express from "express";
import path from "path";
import http from "http";

// replace the value below with the Telegram token you receive from @BotFather
// @ts-ignore
const token = process.env.TELEGRAM_KEY || "";
const bot = new TelegramBot(token, { polling: true });

Esagrams.init(bot);
Tarrot.init(bot);


const app = express();
const server = new http.Server(app);

const port = process.env.PORT || 8080;

app.use('/', express.static(path.join(__dirname, 'testheroku')));

server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/`);
});
