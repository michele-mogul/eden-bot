interface EsagramsMapping {
    [key: string]: {name: string, number:string};
}
interface Message {
    chat: { id: any; };
}

interface Bot {
    onText: (arg0: RegExp, arg1: (msg: Message) => void) => void;
    sendPhoto: (arg0: any, arg1: string) => Promise<any>;
}
