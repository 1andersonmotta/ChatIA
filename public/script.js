class AIChat {
    constructor() {
        this.currentAI = 'gemini';
        this.isLoading = false;
        this.initializeElements();
        this.bindEvents();
        this.loadChatHistory();
    }

    initializeElements() {
        this.aiCards = document.querySelectorAll('.ai-card');
        this.currentAIDisplay = document.getElementById('current-ai');
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.clearChatButton = document.getElementById('clearChat');
        this.loadingIndicator = document.getElementById('loadingIndicator');
        this.errorMessage = document.getElementById('errorMessage');
        this.errorText = document.getElementById('errorText');
        this.closeErrorButton = document.getElementById('closeError');
        this.charCounter = document.querySelector('.char-counter');
    }

    bindEvents() {
        // Seleção de IA
        this.aiCards.forEach(card => {
            card.addEventListener('click', () => this.selectAI(card));
        });

        // Envio de mensagem
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Auto-resize do textarea
        this.messageInput.addEventListener('input', () => {
            this.autoResizeTextarea();
            this.updateCharCounter();
        });

        // Limpar chat
        this.clearChatButton.addEventListener('click', () => this.clearChat());

        // Fechar erro
        this.closeErrorButton.addEventListener('click', () => this.hideError());
    }

    selectAI(selectedCard) {
        // Remove active de todos os cards
        this.aiCards.forEach(card => card.classList.remove('active'));

        // Adiciona active ao card selecionado
        selectedCard.classList.add('active');

        // Atualiza AI atual
        this.currentAI = selectedCard.dataset.ai;        // Atualiza display
        const aiNames = {
            // 'gemini': '💎 Google Gemini',
            'deepseek': '🧠 DeepSeek R1',
            'groq': '⚡ Groq',
            'openrouter-gpt4o': '🤖 GPT-4o (OpenRouter)',
            'openrouter-claude': '🔬 Claude 3 (OpenRouter)'
        };

        this.currentAIDisplay.textContent = aiNames[this.currentAI];

        // Adiciona mensagem de troca de IA
        this.addMessage('bot', `Agora você está conversando com ${aiNames[this.currentAI]}. Como posso ajudar?`);

        // Salva preferência
        localStorage.setItem('selectedAI', this.currentAI);
    }

    async sendMessage() {
        const message = this.messageInput.value.trim();

        if (!message || this.isLoading) return;

        // Validação de tamanho
        if (message.length > 1000) {
            this.showError('Mensagem muito longa. Máximo 1000 caracteres.');
            return;
        }

        // Adiciona mensagem do usuário
        this.addMessage('user', message);

        // Limpa input
        this.messageInput.value = '';
        this.updateCharCounter();
        this.autoResizeTextarea();

        // Mostra loading
        this.setLoading(true);

        try {
            const response = await this.callAI(message);
            this.addMessage('bot', response);
        } catch (error) {
            console.error('Erro ao chamar IA:', error);
            this.showError('Erro ao comunicar com a IA. Tente novamente.');
            this.addMessage('bot', 'Desculpe, ocorreu um erro. Por favor, tente novamente.');
        } finally {
            this.setLoading(false);
        }
    } async callAI(message) {
        const endpoints = {
            // 'gemini': '/api/ai/gemini/chat',
            'deepseek': '/api/ai/deepseek/chat',
            'groq': '/api/ai/groq/chat',
            'openrouter-gpt4o': '/api/ai/openrouter/gpt4o/chat',
            'openrouter-claude': '/api/ai/openrouter/claude/chat'
        };

        const response = await fetch(endpoints[this.currentAI], {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `HTTP ${response.status}`);
        }

        const data = await response.json();
        return data.response || data.message || 'Resposta recebida';
    }

    addMessage(type, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = type === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';

        const messageText = document.createElement('p');
        messageText.textContent = content;

        const messageTime = document.createElement('span');
        messageTime.className = 'message-time';
        messageTime.textContent = new Date().toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        });

        messageContent.appendChild(messageText);
        messageContent.appendChild(messageTime);
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);

        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();

        // Salva no histórico
        this.saveChatHistory();
    }

    setLoading(loading) {
        this.isLoading = loading;
        this.sendButton.disabled = loading;
        this.loadingIndicator.style.display = loading ? 'flex' : 'none';

        if (loading) {
            this.scrollToBottom();
        }
    }

    autoResizeTextarea() {
        this.messageInput.style.height = 'auto';
        this.messageInput.style.height = Math.min(this.messageInput.scrollHeight, 120) + 'px';
    }

    updateCharCounter() {
        const length = this.messageInput.value.length;
        this.charCounter.textContent = `${length}/1000`;

        if (length > 800) {
            this.charCounter.style.color = '#dc2626';
        } else if (length > 600) {
            this.charCounter.style.color = '#d97706';
        } else {
            this.charCounter.style.color = '#6b7280';
        }
    }

    scrollToBottom() {
        setTimeout(() => {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }, 100);
    }

    clearChat() {
        if (confirm('Tem certeza que deseja limpar o chat?')) {
            // Remove todas as mensagens exceto a primeira (mensagem de boas-vindas)
            const messages = this.chatMessages.querySelectorAll('.message');
            for (let i = 1; i < messages.length; i++) {
                messages[i].remove();
            }

            // Limpa histórico
            localStorage.removeItem('chatHistory');
        }
    }

    showError(message) {
        this.errorText.textContent = message;
        this.errorMessage.style.display = 'flex';

        // Auto-hide após 5 segundos
        setTimeout(() => this.hideError(), 5000);
    }

    hideError() {
        this.errorMessage.style.display = 'none';
    }

    saveChatHistory() {
        const messages = Array.from(this.chatMessages.querySelectorAll('.message')).map(msg => {
            const isUser = msg.classList.contains('user-message');
            const content = msg.querySelector('.message-content p').textContent;
            const time = msg.querySelector('.message-time').textContent;
            return { type: isUser ? 'user' : 'bot', content, time };
        });

        localStorage.setItem('chatHistory', JSON.stringify(messages));
    }

    loadChatHistory() {
        // Carrega IA selecionada
        const savedAI = localStorage.getItem('selectedAI');
        if (savedAI) {
            const aiCard = document.querySelector(`[data-ai="${savedAI}"]`);
            if (aiCard) {
                this.selectAI(aiCard);
            }
        }

        // Carrega histórico do chat
        const history = localStorage.getItem('chatHistory');
        if (history) {
            try {
                const messages = JSON.parse(history);
                // Limpa mensagem padrão se há histórico
                if (messages.length > 1) {
                    this.chatMessages.innerHTML = '';
                }

                messages.forEach(msg => {
                    this.addMessage(msg.type, msg.content);
                });
            } catch (error) {
                console.error('Erro ao carregar histórico:', error);
            }
        }
    }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new AIChat();
});