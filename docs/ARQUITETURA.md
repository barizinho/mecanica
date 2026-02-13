# 🏗️ Arquitetura Técnica - Oficina Mecânica

## Visão Geral do Sistema

```
┌─────────────────────┐
│   BROWSER           │
│  (React Frontend)   │
│  Port 3000          │
└──────────┬──────────┘
           │
           │ HTTP/JSON
           │ (Axios)
           │
┌──────────▼──────────┐
│  EXPRESS SERVER     │
│  (Node.js Backend)  │
│  Port 5000          │
└──────────┬──────────┘
           │
           │ SQL
           │
┌──────────▼──────────┐
│  SQLite Database    │
│  (data.db)          │
└─────────────────────┘
```

---

## 📦 Stack Detalhado

### Backend (Node.js/Express)
```
Backend Estrutura:
├── database/db.ts                    # Conexão SQLite + helpers async
├── controllers/
│   ├── ownerController.ts            # CRUD de proprietários
│   ├── vehicleController.ts          # CRUD de veículos
│   ├── serviceController.ts          # CRUD de serviços
│   ├── checklistController.ts        # Itens de checklist
│   └── photoController.ts            # Gerenciamento de fotos
├── routes/
│   ├── owners.ts                     # GET /api/owners/:id, POST, PUT, DELETE
│   ├── vehicles.ts                   # GET /api/vehicles/:id, POST, PUT, DELETE
│   └── services.ts                   # GET /api/services, POST (com Multer para fotos/assinatura)
└── index.ts                          # App Express: CORS, middlewares, rotas
```

### Frontend (React + TypeScript + Vite)
```
Frontend Estrutura:
├── components/
│   ├── OwnerForm.tsx                 # Formulário de proprietários
│   ├── VehicleForm.tsx               # Formulário de veículos
│   ├── Checklist.tsx                 # Lista de serviços interativa
│   ├── PhotoUpload.tsx               # Upload de fotos com preview
│   └── SignaturePad.tsx              # Captura de assinatura (Canvas)
├── pages/
│   ├── OwnersPage.tsx                # Listar e gerenciar proprietários
│   ├── VehiclesPage.tsx              # Listar e gerenciar veículos
│   ├── ServicesPage.tsx              # Listar e criar serviços
│   └── ServicePage.tsx               # Detalhe de um serviço (checklist, fotos, assinatura)
├── hooks/
│   └── useApi.ts                     # Hook customizado para requisições
├── types.ts                          # Interfaces TypeScript compartilhadas
├── App.tsx                           # Navegação e layout principal
└── index.css                         # Estilos globais
```

---

## 🗄️ Schema do Banco de Dados

### Tabela: owners
```sql
CREATE TABLE owners (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  cpf TEXT UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Tabela: vehicles
```sql
CREATE TABLE vehicles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  owner_id INTEGER NOT NULL,
  plate TEXT UNIQUE NOT NULL,
  model TEXT NOT NULL,
  year INTEGER,
  color TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES owners(id)
);
```

### Tabela: services
```sql
CREATE TABLE services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  vehicle_id INTEGER NOT NULL,
  owner_id INTEGER NOT NULL,
  entry_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  exit_date DATETIME,
  description TEXT,
  status TEXT DEFAULT 'open',
  signature_path TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
  FOREIGN KEY (owner_id) REFERENCES owners(id)
);
```

### Tabela: checklist_items
```sql
CREATE TABLE checklist_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  service_id INTEGER NOT NULL,
  item_description TEXT NOT NULL,
  completed BOOLEAN DEFAULT 0,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (service_id) REFERENCES services(id)
);
```

### Tabela: photos
```sql
CREATE TABLE photos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  service_id INTEGER NOT NULL,
  file_path TEXT NOT NULL,
  photo_type TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (service_id) REFERENCES services(id)
);
```

---

## 🔄 Fluxo de Dados

### Exemplo: Criar um Serviço

```
1. Usuário no Frontend
   └─ Clica "Criar Serviço"
      └─ Preenche: proprietário, veículo, descrição
         └─ Clica "Criar Serviço"

2. Frontend (React)
   └─ Coleta dados do formulário
      └─ Faz requisição POST para API
         useApi().request('POST', '/services', { vehicle_id, owner_id, description })

3. Network (HTTP)
   └─ POST http://localhost:5000/api/services
      └─ Body: { vehicle_id: 1, owner_id: 1, description: "..." }

4. Backend (Express)
   └─ Route Handler: services.ts
      └─ Recebe POST /
         └─ Valida dados
            └─ Controller: serviceController.createService()

5. Controller (Node.js)
   └─ serviceController.createService(vehicle_id, owner_id, description)
      └─ Chama: db.runAsync()
         └─ Executa: INSERT INTO services ...

6. Database (SQLite)
   └─ Insere registro em "services"
      └─ Retorna lastID (novo ID)

7. Response (Backend → Frontend)
   └─ HTTP 201: { id: 42 }

8. Frontend (React)
   └─ useApi recebe resposta
      └─ Atualiza estado com setServices()
      └─ UI renderiza novo serviço na lista
```

---

## 🔐 Fluxo de Upload de Foto

```
1. Usuário seleciona imagem
   └─ PhotoUpload.tsx captura file input

2. Frontend converte arquivo
   └─ FormData append: photo

3. HTTP POST
   └─ POST /api/services/1/photos
      └─ Content-Type: multipart/form-data

4. Backend (Express Multer)
   └─ Middlewave: upload.single('photo')
      └─ Salva em: ./uploads/photo-TIMESTAMP.jpg
      └─ Req.file recebe: { path, filename, size, ... }

5. Controller
   └─ photoController.addPhoto(service_id, file_path)
      └─ INSERT INTO photos (service_id, file_path)

6. Response
   └─ HTTP 201: { id: 5, file_path: './uploads/photo-123456.jpg' }

7. Frontend
   └─ Atualiza foto na UI
      └─ <img src={photo.file_path} />
```

---

## 🖇️ Fluxo de Assinatura

```
1. Usuário desenha assinatura
   └─ SignaturePad.tsx (react-signature-canvas)
      └─ Renderiza <canvas> para desenho

2. Usuário clica "Confirmar Assinatura"
   └─ signatureCanvasRef.toDataURL('image/png')
      └─ Converte canvas em base64

3. Frontend converte base64 para Blob
   └─ fetch(dataURL).then(r => r.blob())
      └─ FormData append: signature

4. HTTP POST
   └─ POST /api/services/1/close
      └─ Content-Type: multipart/form-data

5. Backend
   └─ Route: services.ts POST /:id/close
      └─ Multer salva arquivo
         └─ ./uploads/signature-TIMESTAMP.png
      └─ serviceController.closeService(id, signature_path)
         └─ UPDATE services SET exit_date = NOW(), status = 'closed', signature_path = ...

6. Database
   └─ Marca serviço como fechado

7. Frontend
   └─ Recebe HTTP 200
      └─ Atualiza UI: status muda para "Fechado"
```

---

## 🎯 Pontos de Integração Futura

### 1. Autenticação
```typescript
// Adicionar antes das rotas em backend/src/index.ts
import authRouter from './routes/auth';
app.use('/api/auth', authRouter);
```

### 2. Relatórios PDF
```typescript
// Novo controller: reportController.ts
import PDFDocument from 'pdfkit';
export async function generateServiceReport(serviceId: number) {
  // Buscar dados, renderizar PDF, retornar file
}
```

### 3. Email de Confirmação
```typescript
// Novo middleware: email.ts
import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({...});
```

### 4. Dashboard com Gráficos
```typescript
// Novo page: DashboardPage.tsx
import Chart from 'react-chartjs-2';
```

---

## 🚀 Performance e Otimizações

### Atuais
- SQLite é rápido para pequena escala (até ~10k registros)
- Uploads salvos no filesystem local
- Sem caching de dados

### Recomendações Futuras
1. **Banco de Dados**: Migrar para PostgreSQL se > 10k registros
2. **Cache**: Adicionar Redis para sessões
3. **Storage**: Armazenar fotos em Cloud (AWS S3, Google Cloud)
4. **API**: Implementar paginação nas listagens
5. **Frontend**: Lazy loading de fotos grandes

---

## 🔧 Variáveis de Ambiente

### Backend (.env)
```
PORT=5000                           # Porta do servidor
NODE_ENV=development|production     # Ambiente
DB_PATH=./data.db                   # Localização do banco
UPLOAD_DIR=./uploads                # Pasta de uploads
```

### Frontend (hardcoded em useApi.ts)
```
const API_URL = '/api'              # Proxy via Vite
```

---

## 🧪 Testando a API Manualmente

### 1. Health Check
```bash
curl http://localhost:5000/api/health
```

### 2. Listar Proprietários
```bash
curl http://localhost:5000/api/owners
```

### 3. Criar Proprietário
```bash
curl -X POST http://localhost:5000/api/owners \
  -H "Content-Type: application/json" \
  -d '{"name":"Maria Silva","email":"maria@email.com"}'
```

---

**Documentação v1.0**  
*Última atualização: Fevereiro 2026*
