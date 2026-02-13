# 🔧 Render Config - Exato para Copiar/Colar

## Se você receber erro com `/opt/render/project/src/...`

Significa que a configuração do Render está **errada**. Vou mostrar exatamente como corrigir.

---

## 🎯 OPÇÃO 1: Refazer do Zero (Mais Fácil)

### Passo 1: Delete o Serviço Atual

1. Acesse [render.com](https://render.com)
2. Clique no seu projeto (mecanica-backend)
3. Settings → Delete Service
4. Confirme digitando o nome

### Passo 2: Crie um Novo Web Service

1. "+ New" → "Web Service"
2. Selecione seu repositório GitHub (mecanica)
3. Clique "Connect"

### Passo 3: Configure EXATAMENTE assim

```
Name: mecanica-backend

Environment: Node

Region: Ohio (ou outra)

Root Directory: backend  ← ⭐ SUPER IMPORTANTE!

Build Command:
npm install

Start Command:
npm run prod
```

### Passo 4: Variáveis de Ambiente

Clique "Advanced" → "Add Environment Variable"

```
NODE_ENV = production

PORT = 3000
```

### Passo 5: Deploy

Clique "Create Web Service"

Aguarde 3-4 minutos...

---

## 🎯 OPÇÃO 2: Editar Serviço Existente

1. No Render, click no seu serviço
2. "Settings" → "Build & Deploy"
3. Edite conforme abaixo:

### Build Command
```
npm install
```

### Start Command
```
npm run prod
```

### Root Directory
```
backend
```

4. Scroll down → "Save Changes"
5. Aguarde novo deploy

---

## ✅ O que fazer após Deploy

1. Aguarde mensagem "Your service is live" (ou verde no dashboard)

2. Teste com:
```bash
curl https://seu-backend.onrender.com/api/health
```

3. Se retornar:
```json
{"status":"OK","timestamp":"..."}
```
(sem erro 500 ou 404)

**→ Funcionou! ✅**

---

## 🐛 Se Ainda Tiver Erro

### Erro: Cannot find module `/opt/render/project/src/...`
**Causa:** Root Directory não está configurado como `backend`
**Solução:** Edite Settings e coloque `Root Directory: backend`

### Erro: Cannot find module `.../dist/index.js`
**Causa:** Precisa compilar TypeScript
**Solução:** Use `Start Command: npm run prod`

### Erro: Port already in use
**Causa:** Outra instância rodando
**Solução:** Render reboot automático (aguarde 5 min)

---

## 🔗 Depois que Funcionar

Pegue a URL do Render (ex: `https://mecanica-123.onrender.com`)

E atualize o Frontend:

`frontend/.env.production`:
```
VITE_API_URL=https://mecanica-123.onrender.com/api
```

Depois faça deploy do frontend no Vercel.

---

**Versão**: 1.0.0
