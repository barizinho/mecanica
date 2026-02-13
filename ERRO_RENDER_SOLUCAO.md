# ❌ Erro Render: Cannot find module

Você recebeu este erro no Render?
```
Error: Cannot find module '/opt/render/project/src/backend/dist/index.js'
```

## ✅ SOLUÇÃO RÁPIDA (2 min)

### Seu Render está configurado ERRADO

**Configure assim:**

```
Root Directory: backend  ← Isso é importante!
Build Command: npm install
Start Command: npm run prod
```

**NÃO use:**
- ❌ `cd backend && npm install`
- ❌ `cd backend && npm start`

**Use a pasta ROOT, não cd!**

---

## 📖 Guias Detalhados

- [docs/RENDER_CONFIG.md](docs/RENDER_CONFIG.md) - Como configurar corretamente
- [docs/CORRIGIR_RENDER.md](docs/CORRIGIR_RENDER.md) - Opções para corrigir

---

**Dúvida?** Leia os guias acima 👆
