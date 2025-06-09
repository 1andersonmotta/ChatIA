const express = require('express');
const router = express.Router();

// Importar services reais
const geminiService = require('../services/geminiService');
const deepseekService = require('../services/deepseekService');
const groqService = require('../services/groqService');
const openrouterService = require('../services/openrouterService');
const groupChatService = require('../services/groupChatService');

const setAIRoutes = (app) => {
    app.use('/api', router);
};

// Gemini Chat
router.post('/ai/gemini/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Mensagem é obrigatória' });
        }

        const response = await geminiService.chat(message);

        res.json({
            response,
            provider: 'gemini',
            model: 'gemini-pro'
        });
    } catch (error) {
        console.error('Erro no Gemini chat:', error);
        res.status(500).json({ error: error.message });
    }
});

// DeepSeek Chat
router.post('/ai/deepseek/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Mensagem é obrigatória' });
        }

        const response = await deepseekService.chat(message);

        res.json({
            response,
            provider: 'deepseek',
            model: 'deepseek-r1:free'
        });
    } catch (error) {
        console.error('Erro no DeepSeek chat:', error);
        res.status(500).json({ error: error.message });
    }
});

// Groq Chat
router.post('/ai/groq/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Mensagem é obrigatória' });
        }

        const response = await groqService.chat(message);

        res.json({
            response,
            provider: 'groq',
            model: 'llama3-8b-8192'
        });
    } catch (error) {
        console.error('Erro no Groq chat:', error);
        res.status(500).json({ error: error.message });
    }
});

// OpenRouter Chat - GPT-4o
router.post('/ai/openrouter/gpt4o/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Mensagem é obrigatória' });
        }

        const response = await openrouterService.chatGPT4o(message);

        res.json({
            response,
            provider: 'openrouter',
            model: 'gpt-4o'
        });
    } catch (error) {
        console.error('Erro no OpenRouter GPT-4o chat:', error);
        res.status(500).json({ error: error.message });
    }
});

// OpenRouter Chat - Claude
router.post('/ai/openrouter/claude/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Mensagem é obrigatória' });
        }

        const response = await openrouterService.chatClaude(message);

        res.json({
            response,
            provider: 'openrouter',
            model: 'claude-3-haiku'
        });
    } catch (error) {
        console.error('Erro no OpenRouter Claude chat:', error);
        res.status(500).json({ error: error.message });
    }
});

// Listar modelos disponíveis
router.get('/ai/models', (req, res) => {
    const models = {
        gemini: ['gemini-pro', 'gemini-pro-vision'],
        deepseek: ['deepseek-r1:free', 'deepseek-chat'],
        groq: ['llama3-8b-8192', 'mixtral-8x7b-32768'],
        openrouter: ['gpt-4o', 'claude-3-haiku', 'deepseek-r1']
    };

    res.json({ models });
});

// === ROTAS DE CHAT EM GRUPO ===

// Chat em grupo - todas as IAs respondem uma vez
router.post('/ai/group/chat', async (req, res) => {
    try {
        const { message, selectedAIs } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Mensagem é obrigatória' });
        }

        console.log('Iniciando chat em grupo com:', { message, selectedAIs });

        const result = await groupChatService.startGroupChat(message, selectedAIs);

        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error('Erro no chat em grupo:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Chat contínuo em grupo - IAs conversam entre si por várias rodadas
router.post('/ai/group/continuous', async (req, res) => {
    try {
        const { message, rounds = 3, selectedAIs } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Mensagem é obrigatória' });
        }

        if (rounds < 1 || rounds > 10) {
            return res.status(400).json({ error: 'Número de rodadas deve ser entre 1 e 10' });
        }

        console.log('Iniciando chat contínuo:', { message, rounds, selectedAIs });

        const result = await groupChatService.continuousGroupChat(message, rounds, selectedAIs);

        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error('Erro no chat contínuo:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Listar IAs disponíveis para chat em grupo
router.get('/ai/group/available', (req, res) => {
    try {
        const availableAIs = groupChatService.getAvailableAIs();
        res.json({
            success: true,
            data: availableAIs
        });
    } catch (error) {
        console.error('Erro ao listar IAs:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = setAIRoutes;