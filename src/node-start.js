"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Tarot_1 = __importDefault(require("./services/Tarot"));
const Esagrams_1 = __importDefault(require("./services/Esagrams"));
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
// replace the value below with the Telegram token you receive from @BotFather
// @ts-ignore
const token = process.env.TELEGRAM_KEY || "";
const bot = new node_telegram_bot_api_1.default(token, { polling: true });
Esagrams_1.default.init(bot);
Tarot_1.default.init(bot);
