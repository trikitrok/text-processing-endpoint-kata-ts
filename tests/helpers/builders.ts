import {WordWithFrequency} from "../../src/domain/wordWithFrequency";
import {AnalysisResult} from "../../src/domain/analysisResult";

export function anAnalysisResult(): AnalysisResultBuilder {
    return new AnalysisResultBuilder([], 0);
}

export function word(text: string = ""): RankedWordBuilder {
    return new RankedWordBuilder(text, 0);
}

export function wordsWithFrequency(...rankedWordBuilders: RankedWordBuilder[]): WordWithFrequency[] {
    return rankedWordBuilders.map(builder => builder.build());
}

class AnalysisResultBuilder {
    private countedWords: number;
    private readonly rankedWords: Array<WordWithFrequency>;

    public constructor(rankedWords: Array<WordWithFrequency>, countedWords: number) {
        this.rankedWords = rankedWords;
        this.countedWords = countedWords;
    }

    public ofTextWithLength(countedWords: number): AnalysisResultBuilder {
        this.countedWords = countedWords;
        return this;
    }

    public add(aRankedWordBuilder: RankedWordBuilder): AnalysisResultBuilder {
        this.rankedWords.push(aRankedWordBuilder.build());
        return this;
    }

    public build(): AnalysisResult {
        return new AnalysisResult(this.rankedWords, this.countedWords);
    }
}

class RankedWordBuilder {
    private readonly word: string = "";
    private frequency: number = 0;

    public constructor(word: string, frequency: number) {
        this.word = word;
        this.frequency = frequency;
    }

    public withFrequency(frequency: number): RankedWordBuilder {
        this.frequency = frequency;
        return this;
    }

    public build(): WordWithFrequency {
        return new WordWithFrequency(this.word, this.frequency);
    }
}