// JavaScript para Chat em Grupo
class GroupChatManager {
    constructor() {
        this.selectedAIs = new Set();
        this.availableAIs = [];
        this.chatMode = 'single';
        this.isLoading = false;

        this.initializeElements();
        this.setupEventListeners();
        this.loadAvailableAIs();
    }

    initializeElements() {
        this.elements = {
            toggleSettings: document.getElementById('toggleSettings'),
            settingsContent: document.getElementById('settingsContent'),
            aiCheckboxes: document.getElementById('aiCheckboxes'),
            participantsList: document.getElementById('participantsList'),
            chatMessages: document.getElementById('groupChatMessages'),
            messageInput: document.getElementById('groupMessageInput'),
            sendButton: document.getElementById('sendGroupMessage'),
            loadingOverlay: document.getElementById('loadingOverlay'),
            loadingStatus: document.getElementById('loadingStatus'),
            progressBar: document.getElementById('progressBar'),
            roundsInput: document.getElementById('roundsInput'),
            continuousSettings: document.getElementById('continuousSettings')
        };
    }

    setupEventListeners() {
        // Toggle configurações
        this.elements.toggleSettings.addEventListener('click', () => {
            this.toggleSettings();
        });

        // Modo de chat
        document.querySelectorAll('input[name="chatMode"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.chatMode = e.target.value;
                this.toggleContinuousSettings();
                this.updateSendButtonText();
            });
        });

        // Envio de mensagem
        this.elements.sendButton.addEventListener('click', () => {
            this.sendGroupMessage();
        });

        // Enter para enviar (Ctrl+Enter para nova linha)
        this.elements.messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.ctrlKey && !e.shiftKey) {
                e.preventDefault();
                this.sendGroupMessage();
            }
        });

        // Auto-resize do textarea
        this.elements.messageInput.addEventListener('input', () => {
            this.autoResizeTextarea();
        });
    }

    async loadAvailableAIs() {
        try {
            console.log('Carregando IAs disponíveis...');
            const response = await fetch('/api/ai/group/available');
            const data = await response.json();

            if (data.success) {
                this.availableAIs = data.data;
                this.renderAICheckboxes();
                this.selectAllAIs(); // Selecionar todas por padrão
                console.log('IAs carregadas:', this.availableAIs);
            } else {
                console.error('Erro ao carregar IAs:', data.error);
                this.showError('Erro ao carregar IAs disponíveis');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            this.showError('Erro de conexão ao carregar IAs');
        }
    }

    renderAICheckboxes() {
        this.elements.aiCheckboxes.innerHTML = '';

        this.availableAIs.forEach(ai => {
            const checkboxDiv = document.createElement('div');
            checkboxDiv.className = 'ai-checkbox';
            checkboxDiv.innerHTML = `
                <input type="checkbox" id="ai-${ai.key}" value="${ai.key}">
                <div class="ai-info">
                    <div class="ai-icon-small" style="background: ${ai.color}">
                        ${ai.icon}
                    </div>
                    <span class="ai-name">${ai.name}</span>
                </div>
            `;

            const checkbox = checkboxDiv.querySelector('input');
            checkbox.addEventListener('change', (e) => {
                this.toggleAISelection(ai.key, e.target.checked);
                checkboxDiv.classList.toggle('selected', e.target.checked);
            });

            this.elements.aiCheckboxes.appendChild(checkboxDiv);
        });
    }

    selectAllAIs() {
        this.availableAIs.forEach(ai => {
            this.selectedAIs.add(ai.key);
            const checkbox = document.getElementById(`ai-${ai.key}`);
            const checkboxDiv = checkbox.closest('.ai-checkbox');
            checkbox.checked = true;
            checkboxDiv.classList.add('selected');
        });
        this.updateParticipantsList();
    }

    toggleAISelection(aiKey, selected) {
        if (selected) {
            this.selectedAIs.add(aiKey);
        } else {
            this.selectedAIs.delete(aiKey);
        }

        this.updateParticipantsList();
        this.updateSendButtonState();
    }

    updateParticipantsList() {
        this.elements.participantsList.innerHTML = '';

        if (this.selectedAIs.size === 0) {
            this.elements.participantsList.innerHTML = `
                <div style="text-align: center; color: #6b7280; padding: 20px;">
                    <i class="fas fa-user-slash" style="font-size: 2rem; margin-bottom: 10px; display: block;"></i>
                    Nenhuma IA selecionada
                </div>
            `;
            return;
        }

        Array.from(this.selectedAIs).forEach(aiKey => {
            const ai = this.availableAIs.find(a => a.key === aiKey);
            if (!ai) return;

            const participantDiv = document.createElement('div');
            participantDiv.className = 'participant-card active';
            participantDiv.id = `participant-${aiKey}`;
            participantDiv.innerHTML = `
                <div class="participant-icon" style="background: ${ai.color}">
                    ${ai.icon}
                </div>
                <div class="participant-info">
                    <div class="participant-name">${ai.name}</div>
                    <div class="participant-status">Pronto</div>
                </div>
            `;

            this.elements.participantsList.appendChild(participantDiv);
        });
    }

    updateSendButtonState() {
        const hasMessage = this.elements.messageInput.value.trim().length > 0;
        const hasAIs = this.selectedAIs.size > 0;

        this.elements.sendButton.disabled = !hasMessage || !hasAIs || this.isLoading;
    }

    updateSendButtonText() {
        const span = this.elements.sendButton.querySelector('span');
        if (this.chatMode === 'single') {
            span.textContent = 'Enviar para Todas';
        } else {
            span.textContent = 'Iniciar Conversa';
        }
    }

    toggleSettings() {
        this.elements.settingsContent.classList.toggle('collapsed');
        this.elements.toggleSettings.classList.toggle('active');
    }

    toggleContinuousSettings() {
        if (this.chatMode === 'continuous') {
            this.elements.continuousSettings.style.display = 'block';
        } else {
            this.elements.continuousSettings.style.display = 'none';
        }
    }

    autoResizeTextarea() {
        const textarea = this.elements.messageInput;
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';

        this.updateSendButtonState();
    }

    async sendGroupMessage() {
        const message = this.elements.messageInput.value.trim();

        if (!message || this.selectedAIs.size === 0 || this.isLoading) {
            return;
        }

        this.isLoading = true;
        this.elements.sendButton.disabled = true;

        try {
            // Adicionar mensagem do usuário
            this.addUserMessage(message);

            // Limpar input
            this.elements.messageInput.value = '';
            this.autoResizeTextarea();

            // Mostrar loading
            this.showLoading();
            this.updateParticipantsStatus('loading');

            let result;
            if (this.chatMode === 'single') {
                result = await this.sendSingleRoundMessage(message);
            } else {
                const rounds = parseInt(this.elements.roundsInput.value) || 3;
                result = await this.sendContinuousMessage(message, rounds);
            }

            this.hideLoading();
            this.updateParticipantsStatus('active');

            if (this.chatMode === 'single') {
                this.displaySingleRoundResponses(result);
            } else {
                this.displayContinuousConversation(result);
            }

        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            this.hideLoading();
            this.updateParticipantsStatus('error');
            this.showError('Erro ao enviar mensagem: ' + error.message);
        } finally {
            this.isLoading = false;
            this.updateSendButtonState();
        }
    }

    async sendSingleRoundMessage(message) {
        const response = await fetch('/api/ai/group/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                selectedAIs: Array.from(this.selectedAIs)
            })
        });

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.error || 'Erro desconhecido');
        }

        return data.data;
    }

    async sendContinuousMessage(message, rounds) {
        const response = await fetch('/api/ai/group/continuous', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                rounds: rounds,
                selectedAIs: Array.from(this.selectedAIs)
            })
        });

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.error || 'Erro desconhecido');
        }

        return data.data;
    }

    addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'group-message';
        messageDiv.innerHTML = `
            <div class="user-message-group">
                <div class="user-message-content">
                    <div class="user-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="user-text">
                        <strong>Você:</strong> ${this.escapeHtml(message)}
                    </div>
                </div>
            </div>
        `;

        this.elements.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    displaySingleRoundResponses(result) {
        const responsesDiv = document.createElement('div');
        responsesDiv.className = 'group-message';

        const aiResponsesGrid = document.createElement('div');
        aiResponsesGrid.className = 'ai-responses';

        result.responses.forEach(response => {
            const ai = this.availableAIs.find(a => a.key === response.ai);
            const responseCard = document.createElement('div');
            responseCard.className = 'ai-response-card';

            responseCard.innerHTML = `
                <div class="ai-response-header" style="background: ${ai?.color || '#6b7280'}">
                    <span>${response.icon}</span>
                    <span>${response.name}</span>
                    ${response.success ? '<i class="fas fa-check" style="margin-left: auto;"></i>' : '<i class="fas fa-exclamation-triangle" style="margin-left: auto;"></i>'}
                </div>
                <div class="ai-response-content">
                    ${response.success ?
                    this.escapeHtml(response.response) :
                    `<div class="ai-response-error">${this.escapeHtml(response.response)}</div>`
                }
                </div>
                <div class="ai-response-time">
                    ${new Date(response.timestamp).toLocaleTimeString()}
                </div>
            `;

            aiResponsesGrid.appendChild(responseCard);
        });

        responsesDiv.appendChild(aiResponsesGrid);
        this.elements.chatMessages.appendChild(responsesDiv);
        this.scrollToBottom();
    }

    displayContinuousConversation(result) {
        result.conversation.forEach((entry, index) => {
            if (entry.type === 'ai_responses') {
                const roundDiv = document.createElement('div');
                roundDiv.className = 'group-message';
                roundDiv.innerHTML = `
                    <div style="text-align: center; margin: 20px 0;">
                        <h4 style="color: #6366f1; margin: 0;">🔄 Rodada ${entry.round}</h4>
                    </div>
                `;

                const aiResponsesGrid = document.createElement('div');
                aiResponsesGrid.className = 'ai-responses';

                entry.responses.forEach(response => {
                    const ai = this.availableAIs.find(a => a.key === response.ai);
                    const responseCard = document.createElement('div');
                    responseCard.className = 'ai-response-card';

                    responseCard.innerHTML = `
                        <div class="ai-response-header" style="background: ${ai?.color || '#6b7280'}">
                            <span>${response.icon}</span>
                            <span>${response.name}</span>
                            ${response.success ? '<i class="fas fa-check" style="margin-left: auto;"></i>' : '<i class="fas fa-exclamation-triangle" style="margin-left: auto;"></i>'}
                        </div>
                        <div class="ai-response-content">
                            ${response.success ?
                            this.escapeHtml(response.response) :
                            `<div class="ai-response-error">${this.escapeHtml(response.response)}</div>`
                        }
                        </div>
                        <div class="ai-response-time">
                            Rodada ${entry.round} - ${new Date(response.timestamp).toLocaleTimeString()}
                        </div>
                    `;

                    aiResponsesGrid.appendChild(responseCard);
                });

                roundDiv.appendChild(aiResponsesGrid);
                this.elements.chatMessages.appendChild(roundDiv);
            }
        });

        this.scrollToBottom();
    }

    updateParticipantsStatus(status) {
        this.selectedAIs.forEach(aiKey => {
            const participant = document.getElementById(`participant-${aiKey}`);
            if (participant) {
                participant.className = `participant-card ${status}`;
                const statusElement = participant.querySelector('.participant-status');

                switch (status) {
                    case 'loading':
                        statusElement.textContent = 'Processando...';
                        break;
                    case 'active':
                        statusElement.textContent = 'Pronto';
                        break;
                    case 'error':
                        statusElement.textContent = 'Erro';
                        break;
                }
            }
        });
    }

    showLoading() {
        this.elements.loadingOverlay.classList.add('show');
        this.elements.loadingStatus.textContent = `Consultando ${this.selectedAIs.size} IAs...`;

        // Simular progresso
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 20;
            if (progress >= 90) progress = 90;
            this.elements.progressBar.style.width = progress + '%';
        }, 500);

        this.loadingInterval = interval;
    }

    hideLoading() {
        if (this.loadingInterval) {
            clearInterval(this.loadingInterval);
        }

        this.elements.progressBar.style.width = '100%';

        setTimeout(() => {
            this.elements.loadingOverlay.classList.remove('show');
            this.elements.progressBar.style.width = '0%';
        }, 500);
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'group-message';
        errorDiv.innerHTML = `
            <div class="ai-response-error" style="margin: 20px 0; text-align: center;">
                <i class="fas fa-exclamation-triangle" style="margin-right: 10px;"></i>
                ${this.escapeHtml(message)}
            </div>
        `;

        this.elements.chatMessages.appendChild(errorDiv);
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.elements.chatMessages.scrollTop = this.elements.chatMessages.scrollHeight;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    window.groupChat = new GroupChatManager();
    console.log('Chat em grupo inicializado!');
});
