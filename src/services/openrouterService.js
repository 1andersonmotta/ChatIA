const OpenAI = require('openai');

class OpenRouterService {
    constructor() {
        this.apiKey = process.env.OPENROUTER_API_KEY;
        if (this.apiKey) {
            this.openai = new OpenAI({
                baseURL: 'https://openrouter.ai/api/v1',
                apiKey: this.apiKey,
                defaultHeaders: {
                    'HTTP-Referer': 'https://localhost:3000', // Site URL para rankings
                    'X-Title': 'Node.js AI Project', // Nome do site
                }
            });
        }
    }

    async chat(message, model = 'openai/gpt-4o') {
        try {
            console.log('=== DEBUG OPENROUTER ===');
            console.log('API Key existe?', !!this.apiKey);
            console.log('API Key (primeiros 10 chars):', this.apiKey ? this.apiKey.substring(0, 10) + '...' : 'NENHUMA');
            console.log('OpenAI instance:', !!this.openai);
            console.log('Modelo selecionado:', model);

            if (!this.apiKey) {
                throw new Error('OPENROUTER_API_KEY não configurada. Use a chave do OpenRouter fornecida.');
            }

            console.log('Enviando mensagem para OpenRouter:', message);

            const completion = await this.openai.chat.completions.create({
                model: model,
                messages: [
                    {
                        role: 'user',
                        content: message
                    }
                ],
                max_tokens: 1000,
                temperature: 0.7
            });

            console.log('Resposta recebida do OpenRouter:', completion);

            if (completion && completion.choices && completion.choices[0] && completion.choices[0].message) {
                return completion.choices[0].message.content.trim();
            }

            return 'Resposta processada pelo OpenRouter';

        } catch (error) {
            console.error('Erro detalhado no OpenRouter Service:', error);

            // Tratamento específico para diferentes tipos de erro
            if (error.message.includes('401') || error.message.includes('Invalid token') || error.message.includes('unauthorized')) {
                throw new Error('Token do OpenRouter inválido. Verifique sua OPENROUTER_API_KEY');
            }

            if (error.message.includes('429') || error.message.includes('rate limit')) {
                throw new Error('Limite de rate do OpenRouter excedido. Tente novamente em alguns segundos');
            }

            if (error.message.includes('insufficient_quota')) {
                throw new Error('Cota do OpenRouter excedida. Verifique seu saldo');
            }

            if (error.message.includes('model_not_found')) {
                throw new Error('Modelo não encontrado no OpenRouter. Verifique se o modelo está disponível');
            }

            // Para outros erros, retornar uma mensagem mais genérica
            throw new Error(`Erro na API OpenRouter: ${error.message}`);
        }
    }

    // Métodos específicos para diferentes modelos
    async chatGPT4o(message) {
        return this.chat(message, 'openai/gpt-4o');
    }

    async chatDeepSeek(message) {
        return this.chat(message, 'deepseek/deepseek-r1:free');
    }

    async chatClaude(message) {
        return this.chat(message, 'anthropic/claude-3-haiku');
    }
}

module.exports = new OpenRouterService();
