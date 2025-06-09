import { AIController } from '../../src/controllers/aiController';
import { OpenAIService } from '../../src/services/openaiService';
import { AnthropicService } from '../../src/services/anthropicService';
import { GeminiService } from '../../src/services/geminiService';

jest.mock('../../src/services/openaiService');
jest.mock('../../src/services/anthropicService');
jest.mock('../../src/services/geminiService');

describe('AIController', () => {
    let aiController;
    let openAIService;
    let anthropicService;
    let geminiService;

    beforeEach(() => {
        openAIService = new OpenAIService();
        anthropicService = new AnthropicService();
        geminiService = new GeminiService();
        aiController = new AIController(openAIService, anthropicService, geminiService);
    });

    test('should return AI response from OpenAI service', async () => {
        const mockResponse = { data: 'OpenAI response' };
        openAIService.fetchResponse.mockResolvedValue(mockResponse);

        const req = { body: { prompt: 'Hello' } };
        const res = { json: jest.fn() };

        await aiController.getAIResponse(req, res);

        expect(openAIService.fetchResponse).toHaveBeenCalledWith('Hello');
        expect(res.json).toHaveBeenCalledWith(mockResponse);
    });

    test('should return AI response from Anthropic service', async () => {
        const mockResponse = { data: 'Anthropic response' };
        anthropicService.fetchResponse.mockResolvedValue(mockResponse);

        const req = { body: { prompt: 'Hello' } };
        const res = { json: jest.fn() };

        await aiController.getAIResponse(req, res);

        expect(anthropicService.fetchResponse).toHaveBeenCalledWith('Hello');
        expect(res.json).toHaveBeenCalledWith(mockResponse);
    });

    test('should return AI response from Gemini service', async () => {
        const mockResponse = { data: 'Gemini response' };
        geminiService.fetchResponse.mockResolvedValue(mockResponse);

        const req = { body: { prompt: 'Hello' } };
        const res = { json: jest.fn() };

        await aiController.getAIResponse(req, res);

        expect(geminiService.fetchResponse).toHaveBeenCalledWith('Hello');
        expect(res.json).toHaveBeenCalledWith(mockResponse);
    });
});