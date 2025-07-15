import {WordWithFrequency} from "./wordWithFrequency";

export class AnalysisResult {
    readonly countedWords: number;
    readonly wordsWithFrequency: Array<WordWithFrequency>;

    constructor(wordsWithFrequency: Array<WordWithFrequency>, countedWords: number) {
        this.countedWords = countedWords;
        this.wordsWithFrequency = wordsWithFrequency;
    }
}