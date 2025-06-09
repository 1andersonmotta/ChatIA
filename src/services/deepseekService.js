const OpenAI = require('openai');

class DeepSeekService {
    constructor() {
        this.apiKey = process.env.DEEPSEEK_API_KEY;
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

    async chat(message) {
        try {
            console.log('=== DEBUG DEEPSEEK ===');
            console.log('API Key existe?', !!this.apiKey);
            console.log('API Key (primeiros 10 chars):', this.apiKey ? this.apiKey.substring(0, 10) + '...' : 'NENHUMA');
            console.log('OpenAI instance:', !!this.openai);

            if (!this.apiKey) {
                throw new Error('DEEPSEEK_API_KEY não configurada. Use a chave do OpenRouter fornecida.');
            }

            console.log('Enviando mensagem para DeepSeek:', message);

            const completion = await this.openai.chat.completions.create({
                model: 'deepseek/deepseek-r1:free',
                messages: [
                    {
                        role: 'user',
                        content: message
                    }
                ],
                max_tokens: 500,
                temperature: 0.7
            });

            console.log('Resposta recebida do DeepSeek:', completion);

            if (completion && completion.choices && completion.choices[0] && completion.choices[0].message) {
                return completion.choices[0].message.content.trim();
            }

            return 'Resposta processada pelo DeepSeek';

        } catch (error) {
            console.error('Erro detalhado no DeepSeek Service:', error);

            // Tratamento específico para diferentes tipos de erro
            if (error.message.includes('401') || error.message.includes('Invalid token') || error.message.includes('unauthorized')) {
                throw new Error('Token do DeepSeek/OpenRouter inválido. Verifique sua DEEPSEEK_API_KEY');
            }

            if (error.message.includes('429') || error.message.includes('rate limit')) {
                throw new Error('Limite de rate do DeepSeek excedido. Tente novamente em alguns segundos');
            }

            if (error.message.includes('insufficient_quota')) {
                throw new Error('Cota do DeepSeek excedida. Verifique seu saldo no OpenRouter');
            }

            // Para outros erros, retornar uma mensagem mais genérica
            throw new Error(`Erro na API DeepSeek: ${error.message}`);
        }
    }
}

module.exports = new DeepSeekService();
