# Oficina Mecânica - Sistema de Checklist

Um aplicativo web completo para gerenciar serviços em oficina mecânica, com captura de fotos, assinatura digital e histórico de reparos.

## 🚀 Funcionalidades

- ✅ **Cadastro de Proprietários**: Registre proprietários com dados de contato
- ✅ **Registro de Veículos**: Vincule veículos aos proprietários
- ✅ **Checklist de Serviços**: Crie checklists personalizados para cada serviço
- ✅ **Captura de Fotos**: Registre o estado do veículo em fotos
- ✅ **Assinatura Digital**: Obtenha confirmação digital do proprietário
- ✅ **Histórico Completo**: Mantenha registro de todos os reparos realizados

## 🛠️ Stack Tecnológico

### Backend
- **Node.js** + **Express** - API REST
- **SQLite** - Banco de dados local
- **Multer** - Upload de arquivos

### Frontend  
- **React 18** + **TypeScript** - Interface
- **Vite** - Build tool
- **react-signature-canvas** - Captura de assinatura
- **Axios** - HTTP client

## 📁 Estrutura do Projeto

```
mecanica/
├── backend/                          # API REST
│   ├── src/
│   │   ├── database/                # Configuração do SQLite
│   │   ├── controllers/             # Lógica de negócio
│   │   ├── routes/                  # Rotas da API
│   │   └── index.ts                 # Arquivo principal
│   ├── uploads/                     # Pasta para armazenar fotos
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                         # Interface React
│   ├── src/
│   │   ├── components/              # Componentes reutilizáveis
│   │   ├── pages/                   # Páginas da aplicação
│   │   ├── hooks/                   # Hooks customizados
│   │   ├── App.tsx                  # Componente principal
│   │   └── main.tsx                 # Ponto de entrada
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
│
└── shared/                           # Tipos e interfaces compartilhadas
    └── types.ts
```

## 🚀 Como Instalar e Rodar

### Pré-requisitos
- Node.js 16+
- npm ou yarn

### Backend

```bash
cd backend

# Instalar dependências
npm install

# Iniciar em desenvolvimento
npm run dev

# Ou buildar e rodar em produção
npm run build
npm start
```

O backend estará disponível em `http://localhost:5000`

### Frontend

```bash
cd frontend

# Instalar dependências
npm install

# Iniciar em desenvolvimento
npm run dev
```

O frontend estará disponível em `http://localhost:3000`

## 📡 API Endpoints

### Proprietários
- `GET /api/owners` - Listar todos
- `GET /api/owners/:id` - Obter um
- `POST /api/owners` - Criar novo
- `PUT /api/owners/:id` - Atualizar
- `DELETE /api/owners/:id` - Deletar

### Veículos
- `GET /api/vehicles` - Listar todos
- `GET /api/vehicles/:id` - Obter um
- `GET /api/vehicles/owner/:owner_id` - Listar por proprietário
- `POST /api/vehicles` - Criar novo
- `PUT /api/vehicles/:id` - Atualizar
- `DELETE /api/vehicles/:id` - Deletar

### Serviços
- `GET /api/services` - Listar todos
- `GET /api/services/:id` - Obter um
- `POST /api/services` - Criar novo
- `PUT /api/services/:id` - Atualizar
- `POST /api/services/:id/close` - Fechar com assinatura
- `DELETE /api/services/:id` - Deletar

### Checklist
- `GET /api/services/:service_id/checklist` - Listar items
- `POST /api/services/:service_id/checklist` - Adicionar item
- `PUT /api/services/checklist/:item_id` - Atualizar item
- `DELETE /api/services/checklist/:item_id` - Deletar item

### Fotos
- `GET /api/services/:service_id/photos` - Listar fotos
- `POST /api/services/:service_id/photos` - Upload foto
- `DELETE /api/services/:service_id/photos/:photo_id` - Deletar foto

## 📝 Exemplos de Uso

### Criar um novo proprietário
```bash
curl -X POST http://localhost:5000/api/owners \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@email.com",
    "phone": "11999999999",
    "cpf": "123.456.789-00"
  }'
```

### Registrar um veículo
```bash
curl -X POST http://localhost:5000/api/vehicles \
  -H "Content-Type: application/json" \
  -d '{
    "owner_id": 1,
    "plate": "ABC-1234",
    "model": "Gol",
    "year": 2020,
    "color": "Branco"
  }'
```

### Criar um serviço
```bash
curl -X POST http://localhost:5000/api/services \
  -H "Content-Type: application/json" \
  -d '{
    "vehicle_id": 1,
    "owner_id": 1,
    "description": "Revisão completa"
  }'
```

## 🔄 Fluxo de Uso

1. **Entrada**: Proprietário chega com o veículo
2. **Registro**: Sistema registra o proprietário (se novo) e vincula ao veículo
3. **Checklist**: Mecânico cria um checklist de serviços a realizar
4. **Trabalho**: Marca items conforme completa os serviços
5. **Fotos**: Captura fotos do estado do veículo (antes/depois)
6. **Saída**: Finaliza com assinatura do proprietário
7. **Histórico**: Dados ficam salvos para futuras consultas

## 🔐 Segurança

- ✅ Validação de entrada no backend
- ✅ CORS habilitado para conexão frontend-backend
- ⏳ OAuth/Authentication (implementar em futuras versões)

## 📊 Banco de Dados

O sistema usa SQLite com as seguintes tabelas:
- **owners** - Proprietários dos veículos
- **vehicles** - Veículos registrados
- **services** - Serviços realizados
- **checklist_items** - Items de cada serviço
- **photos** - Fotos dos serviços

## 🚀 Próximos Passos

- [ ] Implementar autenticação de usuários
- [ ] Adicionar geração de relatórios PDF
- [ ] Dashboard com gráficos de desempenho
- [ ] Sistema de backup automático
- [ ] App mobile nativo
- [ ] Integração com sistema de pagamento

## 📄 Licença

MIT

## 👨‍💻 Desenvolvimento

Desenvolvido como uma solução interna para gerenciamento de oficina mecânica.

---

**Versão**: 1.0.0  
**Última atualização**: Fevereiro 2026
