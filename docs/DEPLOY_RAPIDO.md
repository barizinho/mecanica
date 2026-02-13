# ⚡ Deploy Rápido - Vercel + Railway

## Por que o erro 404 aconteceu?

Você deployou **backend + frontend juntos** no Vercel. Vercel é uma plataforma serverless que não roda aplicações Express tradicionais. Solução: **separar os deployments**.

---

## ✅ Solução Recomendada: 5 Minutos

### Passo 1: Deploy do Backend no Railway (2 min)

```bash
# No seu repositório GitHub:
# 1. Vá em: https://railway.app
# 2. Clique: "New Project" → "Deploy from GitHub"
# 3. Selecione seu repositório
# 4. Railway detecta automaticamente Node.js
# 5. Variáveis de ambiente:
PORT=3000
NODE_ENV=production
DB_PATH=./data.db

# 6. Clique "Deploy"
# 7. Aguarde ~2 minutos
# 8. Copie a URL gerada (exemplo: https://mecanica-123.up.railway.app)
```

### Passo 2: Atualizar Frontend (1 min)

No Vercel, antes de deployar, configure:

```
Environment Variable:
VITE_API_URL=https://seu-backend-railway.up.railway.app/api
```

### Passo 3: Deploy do Frontend no Vercel (2 min)

```bash
# https://vercel.com
# 1. "New Project" → "Import from Git"
# 2. Selecione seu repositório
# 3. Em "Project Settings":
#    - Root Directory: frontend/
#    - Environment: VITE_API_URL=https://seu-backend-railway.up.railway.app/api
# 4. Clique "Deploy"
```

---

## 🧪 Testar Depois

1. Abra sua URL do Vercel
2. Tente criar um proprietário
3. Se funcionar → ✅ Tudo pronto!

---

## Links Importantes

- **Railway**: https://railway.app
- **Vercel**: https://vercel.com
- **Documentação Completa**: Ver `docs/DEPLOY.md`

---

**Pronto! Seu app está em produção! 🎉**
