class AIController {
    constructor(openAIService, anthropicService, geminiService) {
        this.openAIService = openAIService;
        this.anthropicService = anthropicService;
        this.geminiService = geminiService;
    }

    async getAIResponse(req, res) {
        const { model, prompt } = req.body;

        try {
            let response;

            switch (model) {
                case 'openai':
                    response = await this.openAIService.fetchResponse(prompt);
                    break;
                case 'anthropic':
                    response = await this.anthropicService.fetchResponse(prompt);
                    break;
                case 'gemini':
                    response = await this.geminiService.fetchResponse(prompt);
                    break;
                default:
                    return res.status(400).json({ error: 'Model not supported' });
            }

            return res.status(200).json({ response });
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred while fetching the AI response' });
        }
    }
}

export default AIController;