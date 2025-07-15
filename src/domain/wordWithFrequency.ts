export class WordWithFrequency {
    readonly word: string;
    readonly frequency: number;

    constructor(word: string, frequency: number) {
        this.word = word;
        this.frequency = frequency;
    }
}