# 🆓 Deploy Gratuito - Vercel + Render

## Melhores Opções Gratuitas

| Plataforma | Frontend | Backend | Custo | Limite |
|-----------|----------|---------|-------|--------|
| **Vercel** | ✅ Free | ❌ (paid) | $0 | Ilimitado |
| **Netlify** | ✅ Free | ❌ (paid) | $0 | Ilimitado |
| **Render** | ❌ | ✅ Free | $0 | Dormem após 15 min |
| **Railway** | ❌ | ✅ Crédito | $0 início | $5/mês depois |
| **Fly.io** | ❌ | ✅ Crédito | $0 início | Líms limitados |

---

## ✅ Solução Recomendada: Vercel + Render (TOTALMENTE GRÁTIS)

### 📊 Comparação Rápida

**Render:**
- ✅ Plano gratuito permanente
- ✅ Suporta Node.js/Express
- ❌ Servidor hiberna após 15 min sem requisições
- ✅ Perfeito para apps internas/testes

**Railway:**
- ✅ $5 crédito inicial mensal gratuito
- ✅ Servidor sempre ativo
- ✅ Muito fácil de usar
- ❌ Depois acaba o crédito (paga ou libera)

---

## 🚀 OPÇÃO 1: Vercel (Frontend) + Render (Backend) ✅ RECOMENDADA

### Passo 1: Deploy Backend no Render (3 min)

1. Acesse: **https://render.com**
2. Clique em **"Sign up"** → Use GitHub
3. Clique em **"New +"** → **"Web Service"**
4. Conecte seu repositório GitHub
5. Configure:
   ```
   Name: mecanica-backend
   Environment: Node
   Build Command: cd backend && npm install
   Start Command: cd backend && npm start
   ```
6. Em "Environment", adicione:
   ```
   NODE_ENV=production
   PORT=3000
   ```
7. Clique **"Create Web Service"**
8. Aguarde deploy (~2-3 min)
9. **Copie a URL** gerada (exemplo: `https://mecanica-backend.onrender.com`)

### Passo 2: Atualizar Frontend

No arquivo `frontend/.env.production`, coloque:
```
VITE_API_URL=https://mecanica-backend.onrender.com/api
```

### Passo 3: Deploy Frontend no Vercel (2 min)

1. Acesse: **https://vercel.com**
2. Clique **"Add New"** → **"Project"**
3. Selecione seu repositório
4. Configurar:
   ```
   Framework: Vite
   Root Directory: frontend/
   Environment Variables:
   - VITE_API_URL=https://mecanica-backend.onrender.com/api
   ```
5. Clique **"Deploy"**
6. Pronto! 🎉

---

## 🚀 OPÇÃO 2: Vercel (Frontend) + Railway (Backend) - Com crédito inicial

### Passo 1: Deploy Backend no Railway (2 min)

1. Acesse: **https://railway.app**
2. Clique **"Start New Project"**
3. Selecione **"Deploy from GitHub repo"**
4. Escolha seu repositório
5. Railway detecta automaticamente
6. Environment:
   ```
   RAILWAY_PORT=3000
   NODE_ENV=production
   ```
7. Deploy automático
8. Copie a URL

### Passo 2-3: Mesmo do Render acima

---

## ⚠️ Problema: Render Hiberna

O Render **congela** apps gratuitas após 15 min sem uso. Soluções:

### Opção A: Aceitar Hibernação
- Primeira requisição demora ~30 seg
- Depois normal
- ✅ Bom para apps internas

### Opção B: Usar Cron para manter ativo
No `frontend/src/App.tsx`, adicione:
```typescript
useEffect(() => {
  // Ping a cada 14 minutos para manter ativo
  const interval = setInterval(() => {
    fetch('https://seu-backend.onrender.com/api/health');
  }, 14 * 60 * 1000);
  return () => clearInterval(interval);
}, []);
```

### Opção C: Usar Railway com crédito gratuito
- Não hiberna
- Tem $5/mês de crédito grátis
- Muito bom para começar

---

## 📝 Step-by-Step Simplificado

### Backend no Render

```
1. https://render.com → Sign up (GitHub)
2. New → Web Service
3. Seleciona repo → Configure
4. Build: cd backend && npm install
5. Start: cd backend && npm start
6. Environment: NODE_ENV=production, PORT=3000
7. Create → Aguarde ~3 min
8. Copie URL (looks like: https://xxx.onrender.com)
```

### Frontend no Vercel

```
1. https://vercel.com → Add New Project
2. Import Git Repository
3. Select seu repo
4. Root Directory: frontend/
5. Environment: VITE_API_URL=https://xxx.onrender.com/api
6. Deploy → Pronto!
```

---

## 🧪 Testar

```bash
# Terminal 1: Teste se backend está ativo
curl https://seu-backend.onrender.com/api/health
# Deve retornar: {"status":"OK",...}

# Terminal 2: Abra seu frontend
https://seu-frontend.vercel.app
# Tente criar proprietário
```

---

## ⚠️ Limitações Gratuitas

| Limitação | Render | Railway | Vercel |
|-----------|--------|---------|--------|
| Hibernação | 15 min | Não | Não |
| CPU | Compartilhado | 5 horas/mês | Generoso |
| Disco | 1 GB | 1 GB | - |
| Banda | Ilimitado | Ilimitado | Ilimitado |
| Custo | $0 | $5 crédito | $0 |

---

## 💾 Banco de Dados

**Problema:** SQLite não persiste entre deployments do Render.

### Solução: Usar PostgreSQL gratuito

**Alternativa com Railway:**
- Railway oferece PostgreSQL grátis
- Banco persiste
- Muito fácil de configurar

**Se usar Render:**
- Ou aceita perder dados entre restarts
- Ou muda para PostgreSQL externo (neon.tech oferece grátis)

---

## 🔄 Workflow Recomendado

```
1. Develop localmente (npm run dev)
2. Push para GitHub
3. Render auto-deploy (backend)
4. Vercel auto-deploy (frontend)
5. Pronto em ~5 minutos!
```

---

## 🤔 Qual Escolher?

### **Escolha Render + Vercel se:**
- ✅ App é interna ou de teste
- ✅ OK com hibernação de 15 min
- ✅ Quer 100% grátis para sempre
- ✅ Poucos usuários simultâneos

### **Escolha Railway + Vercel se:**
- ✅ Quer servidor sempre ativo
- ✅ OK gastar $5/mês depois
- ✅ Mais usuários/requisições
- ✅ Precisa de melhor performance

### **Escolha Fly.io se:**
- ✅ Quer sempre ativo
- ✅ Crédito inicial $15
- ✅ Melhor global (data centers mundo inteiro)

---

## 📚 Links Úteis

- Render: https://render.com
- Vercel: https://vercel.com
- Railway: https://railway.app
- Fly.io: https://fly.io

---

**Versão**: 1.0.0  
**Última atualização**: Fevereiro 2026
