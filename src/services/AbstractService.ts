const TelegramBot = require('node-telegram-bot-api');

export default class AbstractService{
    /**
     * @param bot
     */
    static init (bot: Bot){
        if (arguments.length === 1) {
            for(let argument_index in arguments) {
                if(arguments.hasOwnProperty(argument_index)) {
                    let argument = arguments[argument_index];
                    if(!(argument instanceof TelegramBot)){
                        throw TypeError('Init telegram bot');
                    }
                }
            }
        } else {
            throw TypeError('Init telegram bot');
        }
    }
}
