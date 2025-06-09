const geminiService = require('./geminiService');
const deepseekService = require('./deepseekService');
const groqService = require('./groqService');
const openrouterService = require('./openrouterService');

class GroupChatService {
    constructor() {
        this.aiServices = {
            gemini: {
                service: geminiService,
                name: 'Google Gemini',
                icon: '💎',
                color: '#4285f4'
            },
            deepseek: {
                service: deepseekService,
                name: 'DeepSeek R1',
                icon: '🧠',
                color: '#8b5cf6'
            },
            groq: {
                service: groqService,
                name: 'Groq LLaMA',
                icon: '⚡',
                color: '#6c5ce7'
            },
            gpt4o: {
                service: openrouterService,
                name: 'GPT-4o',
                icon: '🤖',
                color: '#ff9500',
                method: 'chatGPT4o'
            },
            claude: {
                service: openrouterService,
                name: 'Claude 3',
                icon: '🔬',
                color: '#e74c3c',
                method: 'chatClaude'
            }
        };
    }

    async startGroupChat(userMessage, selectedAIs = null) {
        try {
            console.log('=== INICIANDO CHAT EM GRUPO ===');
            console.log('Mensagem do usuário:', userMessage);
            console.log('IAs selecionadas:', selectedAIs);

            // Se não especificado, usar todas as IAs
            const activeAIs = selectedAIs || Object.keys(this.aiServices);

            const responses = [];
            const errors = [];

            // Processar todas as IAs em paralelo para velocidade
            const promises = activeAIs.map(async (aiKey) => {
                try {
                    const aiConfig = this.aiServices[aiKey];
                    if (!aiConfig) {
                        throw new Error(`IA '${aiKey}' não encontrada`);
                    }

                    console.log(`Consultando ${aiConfig.name}...`);

                    let response;
                    if (aiConfig.method) {
                        // Para OpenRouter com métodos específicos
                        response = await aiConfig.service[aiConfig.method](userMessage);
                    } else {
                        // Para outros serviços com método chat padrão
                        response = await aiConfig.service.chat(userMessage);
                    }

                    return {
                        ai: aiKey,
                        name: aiConfig.name,
                        icon: aiConfig.icon,
                        color: aiConfig.color,
                        response: response,
                        timestamp: new Date().toISOString(),
                        success: true
                    };

                } catch (error) {
                    console.error(`Erro na IA ${aiKey}:`, error.message);
                    errors.push({
                        ai: aiKey,
                        name: this.aiServices[aiKey]?.name || aiKey,
                        error: error.message
                    });

                    return {
                        ai: aiKey,
                        name: this.aiServices[aiKey]?.name || aiKey,
                        icon: this.aiServices[aiKey]?.icon || '❌',
                        color: this.aiServices[aiKey]?.color || '#gray',
                        response: `Erro: ${error.message}`,
                        timestamp: new Date().toISOString(),
                        success: false
                    };
                }
            });

            // Aguardar todas as respostas
            const results = await Promise.all(promises);

            console.log('=== RESULTADOS DO CHAT EM GRUPO ===');
            console.log(`Total de IAs consultadas: ${results.length}`);
            console.log(`Sucessos: ${results.filter(r => r.success).length}`);
            console.log(`Erros: ${results.filter(r => !r.success).length}`);

            return {
                userMessage,
                responses: results,
                timestamp: new Date().toISOString(),
                totalAIs: results.length,
                successCount: results.filter(r => r.success).length,
                errorCount: results.filter(r => !r.success).length,
                errors: errors
            };

        } catch (error) {
            console.error('Erro no GroupChatService:', error);
            throw new Error(`Erro no chat em grupo: ${error.message}`);
        }
    }

    // Método para obter lista de IAs disponíveis
    getAvailableAIs() {
        return Object.keys(this.aiServices).map(key => ({
            key,
            name: this.aiServices[key].name,
            icon: this.aiServices[key].icon,
            color: this.aiServices[key].color
        }));
    }

    // Método para chat contínuo onde IAs respondem umas às outras
    async continuousGroupChat(initialMessage, rounds = 3, selectedAIs = null) {
        try {
            const conversation = [];
            let currentMessage = initialMessage;

            // Adicionar mensagem inicial do usuário
            conversation.push({
                type: 'user',
                message: currentMessage,
                timestamp: new Date().toISOString()
            });

            for (let round = 1; round <= rounds; round++) {
                console.log(`=== RODADA ${round} ===`);

                const roundResponses = await this.startGroupChat(currentMessage, selectedAIs);
                conversation.push({
                    type: 'ai_responses',
                    round: round,
                    responses: roundResponses.responses,
                    timestamp: new Date().toISOString()
                });

                // Para a próxima rodada, usar a resposta de uma IA aleatória como base
                const successfulResponses = roundResponses.responses.filter(r => r.success);
                if (successfulResponses.length > 0) {
                    const randomResponse = successfulResponses[Math.floor(Math.random() * successfulResponses.length)];
                    currentMessage = `Respondendo a ${randomResponse.name}: ${randomResponse.response}`;
                }
            }

            return {
                initialMessage,
                conversation,
                totalRounds: rounds,
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            console.error('Erro no chat contínuo:', error);
            throw new Error(`Erro no chat contínuo: ${error.message}`);
        }
    }
}
module.exports = new GroupChatService();

