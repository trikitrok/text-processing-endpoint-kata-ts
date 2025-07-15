import {WordWithFrequency} from "../../src/domain/wordWithFrequency";
import {word, wordsWithFrequency} from "../helpers/builders";
import {Analysis} from "../../src/domain/analysis";

describe('analysing text', () => {
    let analysis: Analysis;

    beforeEach(() => {
        analysis = new Analysis();
    });

    it.each([
        ["", 0],
        ["text", 1],
        ['-_*(!@#$%^&*()_-={}[]:\"<>,.?/~`', 0],
        ["text longer", 2],
        ["text      longer", 2],
        ["text text longer", 3],
    ])('counting words of "%s"', (text: string, countedWords: number) => {
        expect(analysis.runOn(text).countedWords).toBe(countedWords);
    });

    it.each([
        ["", []],
        ['-_*(!@#$%^&*()_-={}[]:\"<>,.?/~`', []],
        ["text", wordsWithFrequency(word("text").withFrequency(1))],
        ["text ranking text ranking", wordsWithFrequency(word("text").withFrequency(2), word("ranking").withFrequency(2))],
        ["text ranking text ranking ranking", wordsWithFrequency(word("ranking").withFrequency(3), word("text").withFrequency(2))],
    ])('ranking words by frequency "%s"', (text: string, rankedWords: WordWithFrequency[]) => {
        expect(analysis.runOn(text).wordsWithFrequency).toEqual(rankedWords);
    });
});