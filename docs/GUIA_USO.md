# 🚀 Guia de Uso - Sistema de Checklist Oficina Mecânica

## Iniciando o Projeto

### Terminal 1: Iniciar Backend
```bash
cd backend
npm run dev
```
O servidor estará em: `http://localhost:5000`

### Terminal 2: Iniciar Frontend
```bash
cd frontend
npm run dev
```
A aplicação estará em: `http://localhost:3000`

---

## 📋 Fluxo de Uso Básico

### 1️⃣ Cadastrar um Proprietário
1. Abra a aba **"Proprietários"**
2. Clique em **"Novo Proprietário"**
3. Preencha os dados:
   - Nome (obrigatório)
   - Email (opcional)
   - Telefone (opcional)
   - CPF (opcional)
4. Clique em **"Cadastrar"**

### 2️⃣ Registrar um Veículo
1. Vá para a aba **"Veículos"**
2. Selecione um proprietário no filtro
3. Clique em **"Novo Veículo"**
4. Preencha os dados:
   - Placa (obrigatório) - Exemplo: ABC-1234
   - Modelo (obrigatório) - Exemplo: Gol
   - Ano (opcional)
   - Cor (opcional)
5. Clique em **"Cadastrar"**

### 3️⃣ Criar um Serviço
1. Vá para a aba **"Serviços"**
2. Selecione um proprietário
3. Selecione um veículo do proprietário
4. (Opcional) Adicione uma descrição dos serviços
5. Clique em **"Criar Serviço"**

### 4️⃣ Gerenciar o Checklist
Na página do serviço:
1. **Adicionar itens**: Digite a descrição e clique em "Adicionar"
2. **Marcar completo**: Clique no checkbox quando terminar cada serviço
3. **Remover item**: Use o botão de delete

### 5️⃣ Capturar Fotos
1. Clique em **"Selecionar Foto"**
2. Tire uma foto (câmera) ou escolha do arquivo
3. A foto será carregada automaticamente

💡 **Dica**: Use um dispositivo móvel para isso!

### 6️⃣ Obter Assinatura do Proprietário
1. Desça até o componente **"Assinatura do Proprietário"**
2. Peça ao proprietário para assinar na tela
3. Clique em **"Confirmar Assinatura"**
4. O serviço será fechado automaticamente

---

## 📊 Consultando Histórico

Todos os serviços ficam registrados na lista de histórico. Você pode:
- Ver o status (Aberto/Fechado)
- Horário de entrada e saída
- Dados do proprietário e veículo
- Acessar qualquer serviço passado para revisar

---

## 🔧 Estrutura da API

Se quiser usar via API diretamente:

### Criar Proprietário
```bash
POST http://localhost:5000/api/owners
{
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "11999999999"
}
```

### Criar Veículo
```bash
POST http://localhost:5000/api/vehicles
{
  "owner_id": 1,
  "plate": "ABC-1234",
  "model": "Gol",
  "year": 2020,
  "color": "Branco"
}
```

### Criar Serviço
```bash
POST http://localhost:5000/api/services
{
  "vehicle_id": 1,
  "owner_id": 1,
  "description": "Revisão completa"
}
```

### Adicionar Item ao Checklist
```bash
POST http://localhost:5000/api/services/1/checklist
{
  "item_description": "Trocar óleo"
}
```

### Upload de Foto
```bash
POST http://localhost:5000/api/services/1/photos
(form-data com file 'photo')
```

### Fechar Serviço com Assinatura
```bash
POST http://localhost:5000/api/services/1/close
(form-data com file 'signature')
```

---

## 💾 Dados Persistentes

Todos os dados são salvos em um arquivo SQLite (`data.db`) localizado na pasta do backend. 

**Para backup**: Faça uma cópia do arquivo `backend/data.db`

**Para resetar**: Delete o arquivo `data.db` e reinicie o backend (ele recria vazio)

---

## 🐛 Troubleshooting

### Erro: "Cannot GET /"
- Certifique-se de que o backend está rodando (`npm run dev` na pasta backend)

### Erro: "CORS"
- Necessário reiniciar ambos os servidores
- Verifique se as URLs estão corretas (localhost:5000 e localhost:3000)

### Fotos não aparecem
- Verifique se a pasta `backend/uploads` existe e tem permissão de escrita
- Estado do arquivo em `backend/uploads/.gitkeep`

### Erro ao compilar TypeScript
```bash
cd backend
npm install
npm run build
```

---

## 📱 Usando em Dispositivo Móvel

1. Obtenha o IP de sua máquina:
   ```bash
   ipconfig  # Windows
   ifconfig  # Mac/Linux
   ```

2. Na URL do navegador do celular, use:
   ```
   http://SEU_IP_AQUI:3000
   ```

3. O app funcionará normalmente, com suporte a câmera!

---

## ⚙️ Configurações

### Backend
**Arquivo**: `backend/.env`
```
PORT=5000                    # Porta do servidor
NODE_ENV=development         # Ambiente
DB_PATH=./data.db           # Localização do banco de dados
UPLOAD_DIR=./uploads        # Pasta para uploads
```

### Frontend
**Arquivo**: `frontend/vite.config.ts`
- Configura proxy da API e porta do dev server

---

## 🚀 Próximos Passos

Após dominar o uso básico:

1. **Personalize a interface** - Adapte as cores e layout
2. **Adicione mais campos** - Estenda os formulários
3. **Crie relatórios** - Use os dados para gerar insights
4. **Integre pagamento** - Adicione cobrança automatizada
5. **Deploy** - Coloque em produção

---

**Sistema v1.0.0**  
Documentação atualizada em Fevereiro 2026
