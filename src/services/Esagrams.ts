import TelegramBot from "node-telegram-bot-api";
const fs         = require('fs');
const Line  = require('pureimage/src/Line.js');
const exagramMapping: EsagramsMapping = {
    "111111" :{name:"Ch'ien", number:"1"},
    "000000" :{name:"K'un", number:"2"},
    "010001" :{name:"Chun", number:"3"},
    "100010" :{name:"Meng", number:"4"},
    "010111" :{name:"Hsu", number:"5"},
    "111010" :{name:"Sung", number:"6"},
    "000010" :{name:"Shih", number:"7"},
    "010000" :{name:"Pi", number:"8"},
    "110111" :{name:"Hsiao Ch'u", number:"9"},
    "111011" :{name:"Lù", number:"10"},
    "000111" :{name:"T'ai", number:"11"},
    "111000" :{name:"P'i", number:"12"},
    "111101" :{name:"T'ung Jen", number:"13"},
    "101111" :{name:"Ta Yu", number:"14"},
    "000100" :{name:"Ch'ien", number:"15"},
    "001000" :{name:"Yu", number:"16"},
    "011001" :{name:"Sui", number:"17"},
    "100110" :{name:"Ku", number:"18"},
    "000011" :{name:"Lin", number:"19"},
    "110000" :{name:"Kuan", number:"20"},
    "101001" :{name:"Shih Ho", number:"21"},
    "100101" :{name:"Pi", number:"22"},
    "100000" :{name:"Po", number:"23"},
    "000001" :{name:"Fu", number:"24"},
    "111001" :{name:"Wu Wang", number:"25"},
    "100111" :{name:"Ta Ch'u", number:"26"},
    "100001" :{name:"I", number:"27"},
    "011110" :{name:"Ta Kuo", number:"28"},
    "010010" :{name:"K'An", number:"29"},
    "101101" :{name:"Li", number:"30"},
    "011100" :{name:"Hsien", number:"31"},
    "001110" :{name:"Heng", number:"32"},
    "111100" :{name:"Tun", number:"33"},
    "001111" :{name:"Ta Chuang", number:"34"},
    "101000" :{name:"Chin", number:"35"},
    "000101" :{name:"Ming I", number:"36"},
    "110101" :{name:"Chia Jen", number:"37"},
    "101011" :{name:"K'uei", number:"38"},
    "010100" :{name:"Chien", number:"39"},
    "001010" :{name:"Hsieh", number:"40"},
    "100011" :{name:"Sun", number:"41"},
    "110001" :{name:"I", number:"42"},
    "011111" :{name:"Kuai", number:"43"},
    "111110" :{name:"Kou", number:"44"},
    "011000" :{name:"Ts'ui", number:"45"},
    "000110" :{name:"Sheng", number:"46"},
    "011010" :{name:"K'un", number:"47"},
    "010110" :{name:"Ching", number:"48"},
    "011101" :{name:"Ko", number:"49"},
    "101110" :{name:"Ting", number:"50"},
    "001001" :{name:"Chen", number:"51"},
    "100100" :{name:"Ken", number:"52"},
    "110100" :{name:"Chien", number:"53"},
    "001011" :{name:"Kuei Mei", number:"54"},
    "001101" :{name:"Feng", number:"55"},
    "101100" :{name:"Lu", number:"56"},
    "110110" :{name:"Sun", number:"57"},
    "011011" :{name:"Tui", number:"58"},
    "110010" :{name:"Huan", number:"59"},
    "010011" :{name:"Chieh", number:"60"},
    "110011" :{name:"Chung Fu", number:"61"},
    "001100" :{name:"Hiao Kuo", number:"62"},
    "010101" :{name:"Chi Chi", number:"63"},
    "101010" :{name:"Wei Chi", number:"64"}
}

export default class Esagrams {

    static init (bot: TelegramBot){
        Esagrams.esagramExtraction(bot);
    }

    static esagramExtraction(bot: TelegramBot) {
        bot.onText(/\/esagramma/, (msg: Message) => {
            let PImage = require('pureimage'),
                yImage = 400,
                xImage = 400,
                img1 = PImage.make(xImage, yImage),
                ctx = img1.getContext('2d'),
                startX = 0,
                endX = 400;

            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, 400, 400);

            const thick = 15;
            const xMultiplier = yImage / 7.5;
            let name = "";
            for (let lines = 1; lines <= 6; lines++) {
                let effectiveY = xMultiplier * lines,
                    number = Math.round((Math.random() * (9 - 6) + 6)),
                    coin = number % 2 !== 0;

                name = name + Math.round(Number(coin));
                for (let i = 0; i < thick; i++) {
                    if (!coin) {
                        ctx.drawLine(new Line(startX, effectiveY + i, endX, effectiveY + i));
                    } else {
                        let partialOneEnd = endX / 2 - endX / 8,
                            partialTwoStart = endX / 2 + endX / 8;

                        ctx.drawLine(new Line(startX, effectiveY + i, partialOneEnd, effectiveY + i));
                        ctx.drawLine(new Line(partialTwoStart, effectiveY + i, endX, effectiveY + i));
                    }
                }
            }
            let chingName = exagramMapping[name].number + ": " + exagramMapping[name].name;
            let fnt = PImage.registerFont(__dirname + '/fonts/t-masterout.ttf', 'Source Sans Pro');

            fnt.load(() => {
                try{
                    ctx.font = "36pt 'Source Sans Pro'";
                    ctx.fillStyle = '#000';
                    let xTextStart = endX / 2 - chingName.length * 8;
                    ctx.fillText(chingName, xTextStart, xMultiplier*7.2 );
                }catch (e) {
                    console.log(e);
                }

                let png = `out${name}.png`;
                PImage.encodePNGToStream(img1, fs.createWriteStream(png)).then(() => {
                    bot.sendPhoto(msg.chat.id, png).then(() => {
                        fs.unlink(png, (err: any) => {
                            if (err) throw err
                        })
                    });
                }).catch((e: any) => {
                    console.log(e);
                });
            });
        });
    }


}
