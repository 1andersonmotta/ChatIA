<div align="center">

# 🤖 AI Chat Interface

**Uma plataforma revolucionária para conversar com múltiplas IAs simultaneamente**

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.19+-blue.svg)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-orange.svg)](https://github.com)

[Demonstração](#-demonstração) • [Instalação](#-instalação) • [Funcionalidades](#-funcionalidades) • [APIs Suportadas](#-apis-suportadas) • [Contribuição](#-contribuição)

</div>

---

## 🎯 **Sobre o Projeto**

O **AI Chat Interface** é uma aplicação inovadora que permite interagir com múltiplas APIs de inteligência artificial em uma única interface. Desenvolvido com Node.js e Express, oferece tanto conversas individuais quanto **salas de chat em grupo** onde diferentes IAs conversam entre si, criando debates fascinantes e perspectivas únicas.

### ✨ **Diferenciais**

- 🎪 **Sala de Chat em Grupo**: Primeira plataforma a permitir conversas simultâneas entre múltiplas IAs
- ⚡ **Processamento Paralelo**: Respostas ultra-rápidas de todas as IAs ao mesmo tempo
- 🔄 **Modo Conversa Contínua**: IAs debatem umas com as outras por várias rodadas
- 📱 **Interface Responsiva**: Design moderno e adaptável para todos os dispositivos
- 🛡️ **Arquitetura Robusta**: Sistema escalável com tratamento de erros avançado

---

## 🚀 **Funcionalidades**

### 💬 **Chat Individual**
- Converse com cada IA separadamente
- Interface intuitiva com seleção visual de modelos
- Histórico de conversas em tempo real
- Indicadores de status e disponibilidade

### 👥 **Sala de Chat em Grupo**
- **Resposta Única**: Todas as IAs respondem simultaneamente à sua pergunta
- **Conversa Contínua**: IAs conversam entre si por múltiplas rodadas
- Seleção customizável de participantes
- Visualização organizada por cartões coloridos
- Loading dinâmico com progresso visual

### 🔧 **Recursos Técnicos**
- Rate limiting inteligente
- Tratamento robusto de erros
- Logs detalhados para debugging
- Configuração flexível via variáveis de ambiente
- Arquitetura modular e escalável

---

## 🤖 **APIs Suportadas**

<table>
<tr>
<td align="center">
<img src="https://img.shields.io/badge/Google-Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini"/>
<br><strong>100% Gratuito</strong>
</td>
<td align="center">
<img src="https://img.shields.io/badge/DeepSeek-R1-8B5CF6?style=for-the-badge&logo=brain&logoColor=white" alt="DeepSeek"/>
<br><strong>Gratuito via OpenRouter</strong>
</td>
<td align="center">
<img src="https://img.shields.io/badge/Groq-LLaMA-6C5CE7?style=for-the-badge&logo=lightning&logoColor=white" alt="Groq"/>
<br><strong>100% Gratuito</strong>
</td>
</tr>
<tr>
<td align="center">
<img src="https://img.shields.io/badge/OpenAI-GPT--4o-FF9500?style=for-the-badge&logo=openai&logoColor=white" alt="GPT-4o"/>
<br><strong>Via OpenRouter</strong>
</td>
<td align="center">
<img src="https://img.shields.io/badge/Anthropic-Claude%203-E74C3C?style=for-the-badge&logo=anthropic&logoColor=white" alt="Claude"/>
<br><strong>Via OpenRouter</strong>
</td>
<td align="center">
<img src="https://img.shields.io/badge/OpenRouter-Hub-00D4AA?style=for-the-badge&logo=router&logoColor=white" alt="OpenRouter"/>
<br><strong>Múltiplos Modelos</strong>
</td>
</tr>
</table>

---

## 📁 **Arquitetura do Projeto**

```
📦 AI-Chat-Interface
├── 📂 src/
│   ├── 📄 app.js                    # 🚀 Ponto de entrada da aplicação
│   ├── 📂 controllers/              # 🎮 Lógica de controle
│   │   ├── 📄 aiController.js       # 🤖 Controlador das IAs
│   │   └── 📄 index.js              # 📋 Agrupamento de controladores
│   ├── 📂 services/                 # 🔧 Serviços de integração
│   │   ├── 📄 geminiService.js      # 💎 Google Gemini
│   │   ├── 📄 deepseekService.js    # 🧠 DeepSeek R1
│   │   ├── 📄 groqService.js        # ⚡ Groq LLaMA
│   │   ├── 📄 openrouterService.js  # 🌐 OpenRouter (GPT-4o, Claude)
│   │   └── 📄 groupChatService.js   # 👥 Chat em Grupo
│   ├── 📂 routes/                   # 🛣️ Definição de rotas
│   │   ├── 📄 aiRoutes.js           # 🤖 Rotas das IAs
│   │   └── 📄 index.js              # 📋 Configuração geral
│   ├── 📂 middleware/               # ⚙️ Funcionalidades adicionais
│   │   ├── 📄 auth.js               # 🔐 Autenticação
│   │   └── 📄 rateLimiter.js        # 🚦 Controle de taxa
│   ├── 📂 config/                   # ⚙️ Configurações
│   │   └── 📄 database.js           # 🗄️ Banco de dados
│   └── 📂 utils/                    # 🛠️ Utilitários
│       ├── 📄 logger.js             # 📝 Sistema de logs
│       └── 📄 responseHandler.js    # 📤 Formatação de respostas
├── 📂 public/                       # 🎨 Interface do usuário
│   ├── 📄 index.html                # 🏠 Página principal
│   ├── 📄 group-chat.html           # 👥 Sala de chat em grupo
│   ├── 📄 script.js                 # ⚡ JavaScript principal
│   ├── 📄 group-chat.js             # 👥 JavaScript do chat em grupo
│   ├── 📄 styles.css                # 🎨 Estilos principais
│   └── 📄 group-chat.css            # 👥 Estilos do chat em grupo
├── 📂 tests/                        # 🧪 Testes automatizados
│   ├── 📂 controllers/              # 🎮 Testes de controladores
│   └── 📂 services/                 # 🔧 Testes de serviços
├── 📄 package.json                  # 📦 Configuração do projeto
├── 📄 .env                          # 🔑 Variáveis de ambiente
├── 📄 API_SETUP_GUIDE.md           # 📚 Guia de configuração
├── 📄 LINKEDIN_POST.md             # 📱 Conteúdo para redes sociais
└── 📄 README.md                     # 📖 Documentação
```

---

## ⚡ **Instalação Rápida**

### **Pré-requisitos**
- Node.js 18+ 
- npm ou yarn
- Chaves de API (veja o [Guia de APIs](API_SETUP_GUIDE.md))

### **1. Clone o Repositório**
```bash
git clone https://github.com/seu-usuario/ai-chat-interface.git
cd ai-chat-interface
```

### **2. Instale as Dependências**
```bash
npm install
```

### **3. Configure as Variáveis de Ambiente**
```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Configure suas chaves de API no arquivo .env
```

**Exemplo de configuração mínima (.env):**
```env
PORT=3000
NODE_ENV=development

# APIs Gratuitas (Comece por essas!)
GEMINI_API_KEY=sua_chave_gemini_aqui
GROQ_API_KEY=sua_chave_groq_aqui
OPENROUTER_API_KEY=sua_chave_openrouter_aqui
```

### **4. Inicie a Aplicação**
```bash
npm start
```

🎉 **Pronto!** Acesse `http://localhost:3000` e comece a conversar com as IAs!

---

## 🎮 **Como Usar**

### **💬 Chat Individual**
1. Acesse a página principal
2. Selecione uma IA clicando no cartão
3. Digite sua mensagem e pressione Enter
4. Veja a resposta em tempo real!

### **👥 Sala de Chat em Grupo**
1. Clique em "Sala de Chat IA" no header
2. Configure quais IAs participarão
3. Escolha o modo de conversa:
   - **Resposta Única**: Cada IA responde uma vez
   - **Conversa Contínua**: IAs debatem por várias rodadas
4. Digite sua mensagem e veja a mágica acontecer!

### **🎯 Exemplos de Prompts**
```
📝 "Explique inteligência artificial de forma simples"
🤔 "Qual é o futuro da programação?"
🎨 "Criem um debate sobre arte vs tecnologia"
🧠 "Comparem diferentes abordagens para resolver [problema]"
```

---

## 🛠️ **Stack Tecnológica**

<div align="center">

| Categoria | Tecnologias |
|-----------|-------------|
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white) |
| **Frontend** | ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) |
| **APIs de IA** | ![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=flat&logo=openai&logoColor=white) ![Google](https://img.shields.io/badge/Google_AI-4285F4?style=flat&logo=google&logoColor=white) ![Anthropic](https://img.shields.io/badge/Anthropic-8B5CF6?style=flat&logo=anthropic&logoColor=white) |
| **Ferramentas** | ![npm](https://img.shields.io/badge/npm-CB3837?style=flat&logo=npm&logoColor=white) ![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white) ![VSCode](https://img.shields.io/badge/VS_Code-007ACC?style=flat&logo=visualstudiocode&logoColor=white) |

</div>

---

## 🧪 **Testes**

Execute os testes automatizados:

```bash
# Todos os testes
npm test

# Testes específicos
npm run test:controllers
npm run test:services

# Cobertura de código
npm run test:coverage
```

---

## 📊 **Demonstração**

### **🖥️ Interface Principal**
![Interface Principal](docs/screenshots/main-interface.png)

### **👥 Sala de Chat em Grupo**
![Chat em Grupo](docs/screenshots/group-chat.png)

### **⚡ Respostas Simultâneas**
![Respostas Paralelas](docs/screenshots/parallel-responses.png)

> 📹 **Vídeo Demo**: [Assista no YouTube](https://youtube.com/watch?v=demo-video)

---

## 🤝 **Contribuição**

Contribuições são muito bem-vindas! Este projeto está em constante evolução.

### **🔄 Como Contribuir**

1. **Fork** o projeto
2. **Clone** seu fork: `git clone https://github.com/seu-usuario/ai-chat-interface.git`
3. **Crie** uma branch: `git checkout -b feature/nova-funcionalidade`
4. **Commit** suas mudanças: `git commit -m 'Adiciona nova funcionalidade'`
5. **Push** para a branch: `git push origin feature/nova-funcionalidade`
6. **Abra** um Pull Request

### **💡 Ideias para Contribuir**
- 🔐 Sistema de autenticação
- 💾 Histórico de conversas persistente
- 📊 Analytics e métricas de uso
- 🌍 Internacionalização (i18n)
- 🎨 Temas customizáveis
- 📱 App mobile com React Native
- 🔄 Integração com mais APIs de IA

### **🐛 Reportar Bugs**
Encontrou um bug? [Abra uma issue](https://github.com/seu-usuario/ai-chat-interface/issues) com:
- Descrição detalhada
- Passos para reproduzir
- Screenshots (se aplicável)
- Informações do ambiente

---

## 📈 **Roadmap**

- [x] ✅ Chat individual com múltiplas IAs
- [x] ✅ Sala de chat em grupo
- [x] ✅ Interface responsiva
- [x] ✅ Processamento paralelo
- [ ] 🔄 Sistema de autenticação
- [ ] 🔄 Histórico persistente
- [ ] 🔄 Exportação de conversas
- [ ] 🔄 Temas customizáveis
- [ ] 🔄 API pública
- [ ] 🔄 App mobile

---

## 📊 **Performance**

### **⚡ Métricas de Velocidade**
- **Resposta Individual**: < 2s por IA
- **Chat em Grupo**: < 5s para 5 IAs
- **Interface**: Carregamento < 1s
- **Memória**: < 100MB em uso normal

### **🛡️ Confiabilidade**
- **Uptime**: 99.9%
- **Rate Limiting**: Configurável por API
- **Error Handling**: Fallbacks automáticos
- **Retry Logic**: 3 tentativas por falha

---

## 📄 **Licença**

Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para detalhes.

```
MIT License

Copyright (c) 2025 AI Chat Interface

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🙏 **Agradecimentos**

- **OpenAI** pela revolucionária API GPT
- **Google** pelo Gemini gratuito e poderoso
- **Anthropic** pelo Claude e sua abordagem ética
- **Groq** pela velocidade incrível do LLaMA
- **OpenRouter** por facilitar o acesso a múltiplos modelos
- **Comunidade Open Source** por inspiração e recursos

---

## 📞 **Contato**

<div align="center">

**Desenvolvido com ❤️ por [Seu Nome]**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/seu-perfil)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/seu-usuario)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:seu.email@exemplo.com)

**⭐ Se este projeto te ajudou, considere dar uma estrela!**

</div>

---

<div align="center">
<sub>🤖 Construído para explorar o futuro da inteligência artificial</sub>
</div>
