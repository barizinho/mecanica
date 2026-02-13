import express, { Express } from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { initializeDatabase } from '../backend/src/database/db';
import ownerRoutes from '../backend/src/routes/owners';
import vehicleRoutes from '../backend/src/routes/vehicles';
import serviceRoutes from '../backend/src/routes/services';
import { VercelRequest, VercelResponse } from '@vercel/node';

dotenv.config({ path: '../.env' });

const app: Express = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.get('/api', (req, res) => {
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

export default app;
