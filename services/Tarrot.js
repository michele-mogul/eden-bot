import AbstractService from './AbstractService';
const randomFile = require('select-random-file');


export default class Tarrot extends  AbstractService{
    static init (bot){
        super.init(bot);
        bot.onText(/\/tarocco/, (msg) => {
            Tarrot._extractTarot(bot, msg);
        });
        bot.onText(/\/start/, (msg) => {
            Tarrot._extractTarot(bot, msg);
        });
    }

    static _extractTarot(bot, msg) {
        randomFile(__dirname + '/tarots/', (err, file) => {
            const fileToSelect = '/tarots/' + file;
            let photo = __dirname + fileToSelect;
            bot.sendPhoto(msg.chat.id, photo);
        });
    }
}
