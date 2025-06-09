const Groq = require('groq-sdk');

class GroqService {
    constructor() {
        this.apiKey = process.env.GROQ_API_KEY;
        if (this.apiKey) {
            this.groq = new Groq({
                apiKey: this.apiKey,
            });
        }
    }

    async chat(message) {
        try {
            if (!this.apiKey) {
                throw new Error('GROQ_API_KEY não configurada. Obtenha gratuitamente em https://console.groq.com/keys');
            }

            const chatCompletion = await this.groq.chat.completions.create({
                messages: [
                    {
                        role: "user",
                        content: message,
                    },
                ],
                model: "llama3-8b-8192",
                max_tokens: 1000,
                temperature: 0.7,
            });

            return chatCompletion.choices[0]?.message?.content || 'Resposta vazia do Groq';
        } catch (error) {
            console.error('Erro no Groq Service:', error.message);

            if (error.message.includes('Invalid API Key')) {
                throw new Error('Chave da API Groq inválida. Verifique sua GROQ_API_KEY');
            }

            if (error.message.includes('rate limit')) {
                throw new Error('Limite de rate do Groq excedido. Tente novamente em alguns segundos');
            }

            if (error.message.includes('too long')) {
                throw new Error('Mensagem muito longa para o Groq. Tente uma mensagem menor');
            } throw new Error(`Erro na API Groq: ${error.message}`);
        }
    }
}

module.exports = new GroqService();
