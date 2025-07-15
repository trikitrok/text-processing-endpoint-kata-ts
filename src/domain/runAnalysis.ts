import {AnalysisResult} from "./analysisResult";
import {Input} from "./input";
import {Analysis} from "./analysis";
import {ForRunningAnalysis} from "./forRunningAnalysis";

export class RunAnalysis implements ForRunningAnalysis {
    execute(input: Input): AnalysisResult {
        return new Analysis().runOn(input.text);
    }
}