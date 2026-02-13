# ⚡ 10 Minutos: Deploy Grátis (Render + Vercel)

## 🎯 Resumo
- **Frontend**: Vercel (grátis)
- **Backend**: Render (grátis)
- **Tempo**: ~10 minutos
- **Custo**: $0/mês

---

## PASSO 1️⃣: Prepare seu GitHub (1 min)

```bash
# Na pasta do projeto
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/seu-usuario/mecanica.git
git push -u origin main
```

✅ Seu código está no GitHub

---

## PASSO 2️⃣: Deploy Backend (Render) - 3 minutos

### 2.1 - Acesse Render
```
https://render.com → Sign up (use GitHub)
```

### 2.2 - Criar Web Service
```
Clique: "+ New" → "Web Service"
```

### 2.3 - Conectar Repositório
```
Selecione seu repo GitHub (mecanica)
Clique: "Connect"
```

### 2.4 - Configurar Deploy
```
Name: mecanica-backend

Environment: Node
Build Command: 
  cd backend && npm install

Start Command: 
  cd backend && npm start

Instance Type: Free (está selecionado)
```

### 2.5 - Variáveis de Ambiente
```
Clique: "Advanced" → "Add Environment Variable"

Adicione:
NODE_ENV = production
PORT = 3000
```

### 2.6 - Deploy
```
Clique: "Create Web Service"
Aguarde 2-3 minutos...
```

✅ Backend está online! Copie a URL gerada, ela será algo como:
```
https://mecanica-backend.onrender.com
```

---

## PASSO 3️⃣: Preparar Frontend (1 min)

No seu editor, abra `frontend/.env.production`:

```
VITE_API_URL=https://mecanica-backend.onrender.com/api
```

Depois:
```bash
git add frontend/.env.production
git commit -m "Add production API URL"
git push
```

---

## PASSO 4️⃣: Deploy Frontend (Vercel) - 3 minutos

### 4.1 - Acesse Vercel
```
https://vercel.com → Sign up (use GitHub)
```

### 4.2 - Criar Projeto
```
Clique: "Add New" → "Project"
```

### 4.3 - Importar Repositório
```
Selecione seu repo (mecanica)
Clique: "Import"
```

### 4.4 - Configurar
```
Framework Preset: Vite
Root Directory: frontend/

Environment Variables:
VITE_API_URL = https://mecanica-backend.onrender.com/api
```

### 4.5 - Deploy
```
Clique: "Deploy"
Aguarde 1-2 minutos...
```

✅ Frontend está online! URL será algo como:
```
https://mecanica.vercel.app
```

---

## 🎉 PRONTO! 

Seu app está em produção! Teste:

```bash
# Abra no navegador:
https://mecanica.vercel.app

# Tente criar um proprietário
# Se funcionar → ✅ Tudo OK!
```

---

## ⚠️ Problema: Render Hiberna

Se o backend está lento na primeira requisição (demora ~30 seg):

**Solução 1: Aceitar** (é normal pra apps gratuitas)

**Solução 2: Manter Ativo**
No `frontend/src/App.tsx`, adicione no componente:

```typescript
useEffect(() => {
  const interval = setInterval(() => {
    fetch('https://mecanica-backend.onrender.com/api/health').catch();
  }, 10 * 60 * 1000); // A cada 10 minutos
  return () => clearInterval(interval);
}, []);
```

**Solução 3: Usar Railway**
Railway oferece $5/mês grátis e nunca hiberna.

---

## 📞 Troubleshooting

### "404 NOT_FOUND"
**Causa:** Backend não está rodando
**Solução:** Verifique se Render deployou com sucesso

### "CORS Error"
**Causa:** URL do backend está errada
**Solução:** Verifique `VITE_API_URL` em `frontend/.env.production`

### "Cannot GET /"
**Causa:** Frontend não buildou
**Solução:** Verifique se `Root Directory` no Vercel é `frontend/`

---

## 🔄 Workflow Futuro

Depois de deployado, sempre que fizer mudanças:

```bash
git add .
git commit -m "Seu comentário"
git push
```

**Ambas as plataformas auto-deployam!** ✨

---

## 💰 Custos Futuros

- **Vercel**: Sempre grátis (até 72 horas de build/mês)
- **Render**: Sempre grátis, mas hiberna
- **Se quiser sempre ativo**: Considera Railway ($5/mês)

---

**Pronto! Seu app está em produção! 🚀**

Versão: 1.0.0
