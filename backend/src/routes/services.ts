import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import * as serviceController from '../controllers/serviceController';
import * as checklistController from '../controllers/checklistController';
import * as photoController from '../controllers/photoController';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Serviços
router.get('/', async (req, res) => {
  try {
    const services = await serviceController.getAllServices();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar serviços' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const service = await serviceController.getServiceById(parseInt(req.params.id));
    if (!service) {
      return res.status(404).json({ error: 'Serviço não encontrado' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar serviço' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { vehicle_id, owner_id, description } = req.body;
    if (!vehicle_id || !owner_id) {
      return res.status(400).json({ error: 'vehicle_id e owner_id são obrigatórios' });
    }
    const id = await serviceController.createService(vehicle_id, owner_id, description);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar serviço' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { description, status } = req.body;
    await serviceController.updateService(parseInt(req.params.id), description, undefined, status);
    res.json({ message: 'Serviço atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar serviço' });
  }
});

// Fechar serviço com assinatura
router.post('/:id/close', upload.single('signature'), async (req, res) => {
  try {
    const signature_path = req.file ? req.file.path : undefined;
    await serviceController.closeService(parseInt(req.params.id), signature_path);
    res.json({ message: 'Serviço fechado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fechar serviço' });
  }
});

// Deletar serviço
router.delete('/:id', async (req, res) => {
  try {
    await serviceController.deleteService(parseInt(req.params.id));
    res.json({ message: 'Serviço deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar serviço' });
  }
});

// Checklist Items
router.get('/:service_id/checklist', async (req, res) => {
  try {
    const items = await checklistController.getChecklistItemsByServiceId(parseInt(req.params.service_id));
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar checklist' });
  }
});

router.post('/:service_id/checklist', async (req, res) => {
  try {
    const { item_description } = req.body;
    if (!item_description) {
      return res.status(400).json({ error: 'item_description é obrigatório' });
    }
    const id = await checklistController.addChecklistItem(parseInt(req.params.service_id), item_description);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar item' });
  }
});

router.put('/checklist/:item_id', async (req, res) => {
  try {
    const { completed, notes } = req.body;
    await checklistController.updateChecklistItem(parseInt(req.params.item_id), completed, notes);
    res.json({ message: 'Item atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar item' });
  }
});

router.delete('/checklist/:item_id', async (req, res) => {
  try {
    await checklistController.deleteChecklistItem(parseInt(req.params.item_id));
    res.json({ message: 'Item deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar item' });
  }
});

// Fotos
router.get('/:service_id/photos', async (req, res) => {
  try {
    const photos = await photoController.getPhotosByServiceId(parseInt(req.params.service_id));
    res.json(photos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar fotos' });
  }
});

router.post('/:service_id/photos', upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Arquivo não fornecido' });
    }
    const { photo_type } = req.body;
    const id = await photoController.addPhoto(parseInt(req.params.service_id), req.file.path, photo_type);
    res.status(201).json({ id, file_path: req.file.path });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer upload da foto' });
  }
});

router.delete('/:service_id/photos/:photo_id', async (req, res) => {
  try {
    await photoController.deletePhoto(parseInt(req.params.photo_id));
    res.json({ message: 'Foto deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar foto' });
  }
});

export default router;
