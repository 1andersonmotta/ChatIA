const { GoogleGenerativeAI } = require('@google/generative-ai');

class GeminiService {
    constructor() {
        this.apiKey = process.env.GEMINI_API_KEY;
        if (this.apiKey) {
            this.genAI = new GoogleGenerativeAI(this.apiKey);
            this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        }
    }

    async chat(message) {
        try {
            if (!this.apiKey) {
                throw new Error('GEMINI_API_KEY não configurada. Obtenha uma chave gratuita em https://makersuite.google.com/app/apikey');
            }

            const result = await this.model.generateContent(message);
            const response = await result.response;
            const text = response.text();

            return text || 'Resposta vazia do Gemini';
        } catch (error) {
            console.error('Erro no Gemini Service:', error.message);

            if (error.message.includes('API_KEY_INVALID')) {
                throw new Error('Chave da API Gemini inválida. Verifique sua GEMINI_API_KEY');
            }

            if (error.message.includes('QUOTA_EXCEEDED')) {
                throw new Error('Cota do Gemini excedida. Tente novamente mais tarde');
            }

            throw new Error(`Erro na API Gemini: ${error.message}`);
        }
    }
}

module.exports = new GeminiService();