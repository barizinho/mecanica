import express from 'express';
import * as vehicleController from '../controllers/vehicleController';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const vehicles = await vehicleController.getAllVehicles();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar veículos' });
  }
});

router.get('/owner/:owner_id', async (req, res) => {
  try {
    const vehicles = await vehicleController.getVehiclesByOwnerId(parseInt(req.params.owner_id));
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar veículos' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const vehicle = await vehicleController.getVehicleById(parseInt(req.params.id));
    if (!vehicle) {
      return res.status(404).json({ error: 'Veículo não encontrado' });
    }
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar veículo' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { owner_id, plate, model, year, color } = req.body;
    if (!owner_id || !plate || !model) {
      return res.status(400).json({ error: 'owner_id, plate e model são obrigatórios' });
    }
    const id = await vehicleController.createVehicle(owner_id, plate, model, year, color);
    res.status(201).json({ id });
  } catch (error: any) {
    if (error.message.includes('UNIQUE')) {
      res.status(400).json({ error: 'Placa já cadastrada' });
    } else {
      res.status(500).json({ error: 'Erro ao criar veículo' });
    }
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { model, year, color } = req.body;
    if (!model) {
      return res.status(400).json({ error: 'Model é obrigatório' });
    }
    await vehicleController.updateVehicle(parseInt(req.params.id), model, year, color);
    res.json({ message: 'Veículo atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar veículo' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await vehicleController.deleteVehicle(parseInt(req.params.id));
    res.json({ message: 'Veículo deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar veículo' });
  }
});

export default router;
