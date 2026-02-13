# ✅ Corrigir Deploy no Render

## 🔴 Problema
```
Error: Cannot find module '/opt/render/project/src/backend/dist/index.js'
```

**Causa:** Render está procurando no caminho errado. Configurou `cd backend &&` nos comandos quando deveria usar "Root Directory".

---

## ✅ Solução: Reconfigurar no Render

### Opção 1: Deletar e Refazer (Recomendado - 2 min)

1. Acesse sua conta Render
2. Vá em seu Web Service
3. Settings → Delete Service
4. Depois vá em "+ New" → "Web Service" e configure **CORRETAMENTE** (veja abaixo)

### Opção 2: Editar Configuração Existente

1. No Render, vá em seu Web Service
2. Clique em "Settings"
3. Procure por **"Build Command"** e **"Start Command"**
4. Altere para:

```
Build Command: npm install
Start Command: npm start
Root Directory: backend
```

5. Salve e aguarde novo deploy

---

## ✅ Configuração Correta no Render

```
Service Name: mecanica-backend
Environment: Node
Region: Ohio (ou sua preferência)

Root Directory: backend ← IMPORTANTE!

Build Command:
npm install

Start Command: 
npm start

Instance Type: Free

Environment Variables:
NODE_ENV = production
PORT = 3000
```

---

## 🎯 Resumo das Mudanças

### Antes (❌ Errado):
```
Build: cd backend && npm install
Start: cd backend && npm start
```

### Depois (✅ Correto):
```
Root Directory: backend
Build: npm install
Start: npm start
```

---

## 🚀 Próximos Passos

1. Reconfigure o Render (opção 1 ou 2 acima)
2. Aguarde novo deploy (~3 min)
3. Teste:
   ```bash
   curl https://seu-backend.onrender.com/api/health
   ```
4. Se retornar `{"status":"OK",...}` → ✅ Funciona!

---

**Pronto! Render deve deployar com sucesso agora! 🎉**
