# 🚀 Deploy Gratuito - Guia Rápido

## ✅ Melhor Opção: Vercel + Render ($0/mês)

| Plataforma | O quê | Custo | Tempo |
|-----------|-------|-------|-------|
| **Render** | Backend | Grátis (hiberna) | 3 min |
| **Vercel** | Frontend | Grátis | 3 min |

---

## ⚡ PASSO A PASSO (10 min)

### 1. GitHub (1 min)
```bash
cd mecanica
git init
git add .
git commit -m "Deploy inicial"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/mecanica.git
git push -u origin main
```

### 2. Backend (Render) - 3 min

**https://render.com**
```
1. Sign up → Use GitHub
2. "+ New" → "Web Service"  
3. Selecione seu repo
4. Name: mecanica-backend
5. Build: npm install
6. Start: npm start
7. Root Directory: backend (importante!)
7. Environment:
   NODE_ENV = production
   PORT = 3000
8. "Create Web Service"
9. Aguarde... ✅
10. COPIE A URL (exemplo: https://mecanica-backend.onrender.com)
```

### 3. Frontend (Vercel) - 3 min

**Primeiro**, edite `frontend/.env.production`:
```
VITE_API_URL=https://mecanica-backend.onrender.com/api
```

Depois push:
```bash
git add frontend/.env.production
git commit -m "Add API URL"
git push
```

**https://vercel.com**
```
1. Sign up → Use GitHub
2. "Add New" → "Project"
3. Selecione seu repo
4. Root Directory: frontend/
5. Environment:
   VITE_API_URL = https://mecanica-backend.onrender.com/api
6. "Deploy"
7. Aguarde... ✅
```

---

## 🎉 PRONTO!

Seu app está online:
- **Frontend**: https://seu-projeto.vercel.app
- **Backend**: https://seu-projeto.onrender.com

---

## ⚠️ Problema Comum: Render Hiberna

Primeira requisição demora ~30 seg (depois normal). 

**Sugestão**: Use Railway se quiser sempre ativo ($5/mês)

---

## 📚 Documentos Criados

Mais detalhes em:
- `DEPLOY_10_MINUTOS.md` - Passo a passo visual
- `docs/DEPLOY_GRATIS.md` - Todas as opções gratuitas

---

**Sucesso! 🚀**
