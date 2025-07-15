import request from 'supertest';
import express, {Application} from 'express';
import {RunAnalysis} from "../../src/domain/runAnalysis";
import {AnalysisController} from "../../src/api/analysisController";
import {anAnalysisResult, word} from "../helpers/builders";
import {ForRunningAnalysis} from "../../src/domain/forRunningAnalysis";

describe('AnalysisController', () => {
    let app: Application;

    describe('happy paths', () => {
        beforeEach(() => {
            initApp(new AnalysisController(new RunAnalysis()));
        });

        it('analyzes a text without using any option', async () => {
            const response = await request(app).get('/v1/analysis')
                .query({text: 'test input test koko'});

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                analysis: anAnalysisResult().ofTextWithLength(4)
                    .add(word("test").withFrequency(2))
                    .add(word("input").withFrequency(1))
                    .add(word("koko").withFrequency(1)).build()
            });
        });

        it('analyzes an empty text', async () => {
            const response = await request(app).get('/v1/analysis');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                analysis: anAnalysisResult().build()
            });
        });
    })

    describe('problematic paths', () => {
        let runAnalysis: jest.Mocked<ForRunningAnalysis>;

        beforeEach(() => {
            runAnalysis = {
                execute: jest.fn()
            };

            initApp(new AnalysisController(runAnalysis));
        });

        it('should return 500 for unexpected errors', async () => {
            runAnalysis.execute.mockImplementation(() => {
                throw new Error();
            });

            const response = await request(app)
                .get('/v1/analysis')
                .query({text: 'test input'});

            expect(response.status).toBe(500);
            expect(response.body).toEqual({error: 'Internal server error.'});
        });
    });

    function initApp(analysisController: AnalysisController): void {
        app = express();
        app.use(
            '/v1/analysis',
            (req, res) =>
                analysisController.analyze(req, res));
    }
});

