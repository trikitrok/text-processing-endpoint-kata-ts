import {WordWithFrequency} from "../../src/domain/wordWithFrequency";
import {AnalysisResult} from "../../src/domain/analysisResult";

export function anAnalysisResult(): AnalysisResultBuilder {
    return new AnalysisResultBuilder([], 0);
}

export function word(text: string = ""): WordWithFrequencyBuilder {
    return new WordWithFrequencyBuilder(text, 0);
}

export function wordsWithFrequency(...wordWithFrequencyBuilders: WordWithFrequencyBuilder[]): WordWithFrequency[] {
    return wordWithFrequencyBuilders.map(builder => builder.build());
}

class AnalysisResultBuilder {
    private countedWords: number;
    private readonly wordsWithFrequency: Array<WordWithFrequency>;

    constructor(wordsWithFrequency: Array<WordWithFrequency>, countedWords: number) {
        this.wordsWithFrequency = wordsWithFrequency;
        this.countedWords = countedWords;
    }

    ofTextWithLength(countedWords: number): AnalysisResultBuilder {
        this.countedWords = countedWords;
        return this;
    }

    add(wordWithFrequencyBuilder: WordWithFrequencyBuilder): AnalysisResultBuilder {
        this.wordsWithFrequency.push(wordWithFrequencyBuilder.build());
        return this;
    }

    build(): AnalysisResult {
        return new AnalysisResult(this.wordsWithFrequency, this.countedWords);
    }
}

class WordWithFrequencyBuilder {
    private readonly word: string = "";
    private frequency: number = 0;

    constructor(word: string, frequency: number) {
        this.word = word;
        this.frequency = frequency;
    }

    withFrequency(frequency: number): WordWithFrequencyBuilder {
        this.frequency = frequency;
        return this;
    }

    build(): WordWithFrequency {
        return new WordWithFrequency(this.word, this.frequency);
    }
}