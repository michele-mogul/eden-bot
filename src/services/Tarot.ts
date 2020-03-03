import AbstractService from './AbstractService';
// @ts-ignore
import randomFile = require('select-random-file');


export default class Tarot extends  AbstractService{
    static init (bot: Bot){
        super.init(bot);
        bot.onText(/\/tarocco/, (msg: Message) => {
            Tarot._extractTarot(bot, msg);
        });
        bot.onText(/\/start/, (msg: Message) => {
            Tarot._extractTarot(bot, msg);
        });
    }

    static _extractTarot(bot: Bot, msg: Message) {
        randomFile(__dirname + '/tarots/', (err: any, file: string) => {
            const fileToSelect = '/tarots/' + file;
            let photo = __dirname + fileToSelect;
            bot.sendPhoto ? bot.sendPhoto(msg.chat.id, photo) : false;
        });
    }
}
