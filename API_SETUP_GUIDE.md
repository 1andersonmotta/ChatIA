# 🔑 Guia de Configuração das APIs

## ⚡ **QUICK START - API GRATUITA (Recomendado)**

### 1. **Google Gemini** (100% Gratuito)
1. Acesse: https://makersuite.google.com/app/apikey
2. Faça login com sua conta Google
3. Clique em "Create API Key"
4. Copie a chave e cole no arquivo `.env`:
   ```
   GEMINI_API_KEY=sua_chave_aqui
   ```

## 🆓 **Outras APIs Gratuitas**

### 2. **Hugging Face** 
1. Acesse: https://huggingface.co/settings/tokens
2. Crie uma conta gratuita
3. Clique em "New token"
4. Cole no `.env`:
   ```
   HUGGINGFACE_API_KEY=sua_chave_aqui
   ```

### 3. **Groq**
1. Acesse: https://console.groq.com/keys
2. Crie uma conta
3. Clique em "Create API Key" 
4. Cole no `.env`:
   ```
   GROQ_API_KEY=sua_chave_aqui
   ```

## 💰 **APIs com Créditos Grátis (Opcional)**

### 4. **OpenAI** (US$ 5 grátis)
1. Acesse: https://platform.openai.com/api-keys
2. Crie conta (pode precisar de cartão, mas não será cobrado)
3. Clique em "Create new secret key"
4. Cole no `.env`:
   ```
   OPENAI_API_KEY=sua_chave_aqui
   ```

### 5. **Anthropic Claude**
1. Acesse: https://console.anthropic.com/
2. Crie conta
3. Vá em "API Keys" → "Create Key"
4. Cole no `.env`:
   ```
   ANTHROPIC_API_KEY=sua_chave_aqui
   ```

## 🚀 **Testando**

Após configurar pelo menos uma API:

1. Salve o arquivo `.env`
2. Reinicie o servidor:
   ```bash
   npm run dev
   ```
3. Acesse: http://localhost:3000
4. Teste o chat com a IA que você configurou!

## ⚠️ **Importante**

- **NUNCA** compartilhe suas chaves de API
- O arquivo `.env` já está no `.gitignore` 
- Comece com Gemini (100% gratuito)
- Você pode usar apenas uma API se quiser

## 🐛 **Problemas Comuns**

- **"API key não configurada"**: Verifique se a chave está no `.env` sem espaços
- **"Cota excedida"**: Use outra API ou aguarde reset do limite
- **Servidor não reiniciou**: Pare com Ctrl+C e rode `npm run dev` novamente
