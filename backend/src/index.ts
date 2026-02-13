import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { initializeDatabase } from './database/db';
import ownerRoutes from './routes/owners';
import vehicleRoutes from './routes/vehicles';
import serviceRoutes from './routes/services';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos (uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Inicializar banco de dados
initializeDatabase().catch(console.error);

// Rotas
app.use('/api/owners', ownerRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/services', serviceRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    message: 'API Oficina Mecânica',
    version: '1.0.0',
    endpoints: {
      owners: '/api/owners',
      vehicles: '/api/vehicles',
      services: '/api/services',
      health: '/api/health'
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
