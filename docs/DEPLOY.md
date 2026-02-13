# 🚀 Deploy no Vercel + Railway

## Problema Anterior
Ao deployar backend + frontend juntos no Vercel, o erro 404 aparece porque Vercel é uma plataforma **serverless** que não suporta aplicações Express tradicionais facilmente.

## Solução: Separar Backend e Frontend

### Opção 1: Vercel (Frontend) + Railway (Backend) ✅ Recomendada

#### Passo 1: Deployar Backend no Railway

1. Acesse [railway.app](https://railway.app)
2. Clique em "New Project"
3. Selecione "Deploy from GitHub"
4. Conecte seu repositório
5. Railway detectará automaticamente como Node.js
6. Defina a variável de ambiente:
   ```
   PORT=3000
   NODE_ENV=production
   DB_PATH=./data.db
   ```
7. Clique em "Deploy"
8. Após deploy, copie a URL gerada (exemplo: `https://mecanica-backend-prod.up.railway.app`)

#### Passo 2: Atualizar Frontend para chamar Backend

No arquivo `frontend/src/hooks/useApi.ts`:

```typescript
const API_URL = process.env.REACT_APP_API_URL || '/api';
```

No arquivo `frontend/.env.production`:
```
VITE_API_URL=https://mecanica-backend-prod.up.railway.app/api
```

No arquivo `frontend/src/hooks/useApi.ts`, atualize para:
```typescript
const API_URL = import.meta.env.VITE_API_URL || '/api';
```

#### Passo 3: Deployar Frontend no Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Selecione "Import from Git"
4. Escolha seu repositório
5. Em "Root Directory", escolha `frontend/`
6. Adicione variável de ambiente:
   ```
   VITE_API_URL=https://seu-backend-railway.up.railway.app/api
   ```
7. Clique em "Deploy"

---

### Opção 2: Vercel (Full-Stack com Serverless Functions)

Se preferir manter tudo no Vercel, é possível usar **Serverless Functions**.  
**Complexidade**: ⚠️ Alta (não recomendado para iniciantes)

---

### Opção 3: Backend em outro lugar

- **Heroku** (em phase-out, não recomendado)
- **Fly.io** (alternativa a Railway)
- **Sua própria VPS** (DigitalOcean, AWS, etc)

---

## Arquivo de Ambiente Local

Para testar localmente antes de deployar, crie `.env.local` no frontend:

```
VITE_API_URL=http://localhost:5001/api
```

---

## Checklist de Deploy

### Backend (Railway)
- [ ] Código pusheado no GitHub
- [ ] Railway conectado ao repositório
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy realizado com sucesso
- [ ] Health check testado: `https://seu-backend.up.railway.app/api/health`

### Frontend (Vercel)
- [ ] Repositório conectado
- [ ] Root Directory = `frontend/`
- [ ] Variável `VITE_API_URL` configurada com URL do Railway
- [ ] Deploy realizado
- [ ] Testado em produção

---

## Testando o Deploy

### 1. Frontend
Acesse sua URL do Vercel e verifique se carrega

### 2. Backend
```bash
curl https://seu-backend.up.railway.app/api/health
# Deve retornar: {"status":"OK","timestamp":"..."}
```

### 3. Integração
No frontend, tente criar um proprietário. Se não der erro CORS, está funcionando!

---

## Troubleshooting

| Erro | Causa | Solução |
|------|-------|---------|
| 404 NOT_FOUND | Backend não foi deployado | Deploy backend no Railway primeiro |
| CORS Error | URL do backend errada | Verifique `VITE_API_URL` no Vercel |
| Banco vazio em produção | DB not persisted | Railway persiste dados por padrão |

---

## Próximos Passos

Após deploy bem-sucedido:
1. Use em produção normalmente
2. Configure domínio customizado (se quiser)
3. Configure backups do banco de dados
4. Configure CI/CD para atualizações automáticas

---

**Versão**: 1.0.0  
**Última atualização**: Fevereiro 2026
