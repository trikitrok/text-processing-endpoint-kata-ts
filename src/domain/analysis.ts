import {AnalysisResult} from "./analysisResult";
import {WordWithFrequency} from "./wordWithFrequency";

export class Analysis {
    runOn(text: string): AnalysisResult {
        return new AnalysisResult(this.rankWordsIn(text), this.countWordsIn(text));
    }

    private countWordsIn(text: string): number {
        return this.extractFrom(text).length;
    }

    private rankWordsIn(text: string): WordWithFrequency[] {
        const wordsToRank = this.extractFrom(text);
        return this.rank(wordsToRank);
    }

    private extractFrom(text: string): string[] {
        return text.replace(/[^0-9a-z\s]+/gi, '').split(" ").filter(s => s != '');
    }

    private rank(words: string[]): WordWithFrequency[] {
        const frequenciesByWord = this.generateWordFrequencyMap(words);
        return this.rankWordsFrom(frequenciesByWord);
    }

    private rankWordsFrom(wordFrequencyMap: Map<string, number>): WordWithFrequency[] {
        let wordsWithFrequency = Array.from(wordFrequencyMap.entries()).map(
            ([word, frequency]) => new WordWithFrequency(word, frequency)
        );
        return wordsWithFrequency.sort((a, b) => b.frequency - a.frequency);
    }

    private generateWordFrequencyMap(words: string[]): Map<string, number> {
        return words.reduce(
            (acc: Map<string, number>, word: string) => {
                acc.set(word, (acc.get(word) ?? 0) + 1);
                return acc;
            },
            new Map<string, number>()
        );
    }
}