"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractService_1 = __importDefault(require("./AbstractService"));
// @ts-ignore
const randomFile = require("select-random-file");
class Tarot extends AbstractService_1.default {
    static init(bot) {
        super.init(bot);
        bot.onText(/\/tarocco/, (msg) => {
            Tarot._extractTarot(bot, msg);
        });
        bot.onText(/\/start/, (msg) => {
            Tarot._extractTarot(bot, msg);
        });
    }
    static _extractTarot(bot, msg) {
        randomFile(__dirname + '/tarots/', (err, file) => {
            const fileToSelect = '/tarots/' + file;
            let photo = __dirname + fileToSelect;
            bot.sendPhoto ? bot.sendPhoto(msg.chat.id, photo) : false;
        });
    }
}
exports.default = Tarot;
