# 🚀 INÍCIO RÁPIDO

## Para iniciantes - Como rodar o app

### Passo 1: Abra dois terminais

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```
Você deve ver: `🚀 Servidor rodando em http://localhost:5001`

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```
Você deve ver: `VITE v4.5.14 ready in XXX ms` e uma URL local

### Passo 2: Acesse a aplicação
Abra seu navegador em: **http://localhost:3000**

Você verá: **Interface com menu "Dashboard, Proprietários, Veículos, Serviços"**

---

## ✅ Teste Rápido (2 minutos)

1. **Adicione um proprietário**
   - Clique em "Proprietários"
   - Clique em "Novo Proprietário"
   - Nome: "João Silva"
   - Clique em "Cadastrar"

2. **Registre um veículo**
   - Clique em "Veículos"
   - Selecione "João Silva"
   - Clique em "Novo Veículo"
   - Placa: "ABC-1234"
   - Modelo: "Gol"
   - Clique em "Cadastrar"

3. **Crie um serviço**
   - Clique em "Serviços"
   - Selecione "João Silva"
   - Selecione "ABC-1234"
   - Descrição: "Revisão de motor"
   - Clique em "Criar Serviço"

4. **Complete o checklist**
   - Novo Item: "Trocar óleo"
   - Clique em "Adicionar"
   - Marque o checkbox quando pronto

5. **Assine**
   - Desça até "Assinatura do Proprietário"
   - Desenhe sua assinatura
   - Clique em "Confirmar Assinatura"

**Pronto! O serviço foi fechado e salvo no banco de dados! ✨**

---

## 📚 Documentação Completa

- Para **guia detalhado**: Leia `docs/GUIA_USO.md`
- Para **referência técnica**: Leia `README.md`
- Para **arquitetura**: Veja estrutura em `README.md`

---

## 🛠️ Estrutura do Projeto

```
mecanica/
├── backend/              ← API (Node.js/Express)
│   ├── src/
│   │   ├── index.ts     ← Ponto de entrada
│   │   ├── database/    ← Banco SQLite
│   │   ├── controllers/ ← Lógica de negócio
│   │   └── routes/      ← Endpoints da API
│   ├── uploads/         ← Fotos e assinaturas
│   └── package.json
│
├── frontend/             ← App React
│   ├── src/
│   │   ├── App.tsx      ← Componente principal
│   │   ├── pages/       ← Páginas (Proprietários, Veículos, etc)
│   │   ├── components/  ← Formulários e componentes
│   │   └── types.ts     ← Tipos TypeScript
│   └── package.json
│
└── docs/                 ← Documentação
    └── GUIA_USO.md
```

---

## 🔗 URLs Importantes

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5001
- **API Health**: http://localhost:5001/api/health

---

## 💾 Dados Persistem?

SIM! Tudo é salvo em `backend/data.db`

Para **resetar**: Apague `data.db` e reinicie o backend

---

## ❓ Problemas Comuns?

| Problema | Solução |
|----------|---------|
| "Cannot GET /" | Backend não está rodando - execute `npm run dev` em `/backend` |
| Fotos não carregam | Pasta `backend/uploads` precisa de permissão de escrita |
| Erros CORS | Reinicie ambos os servidores |
| Porta 3000/5000 em uso | Mude em `frontend/vite.config.ts` e `backend/.env` |

---

## 🎯 Próximos Passos

Depois de dominar o uso:
1. Customize as cores e logo
2. Adicione mais campos aos formulários
3. Gere relatórios PDF dos serviços
4. Integre com seu sistema de pagamento
5. Deploy em um servidor real

---

**Versão**: 1.0.0  
**Status**: ✅ Pronto para usar  
**Última atualização**: Fevereiro 2026
