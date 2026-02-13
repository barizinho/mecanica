import express from 'express';
import * as ownerController from '../controllers/ownerController';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const owners = await ownerController.getAllOwners();
    res.json(owners);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar proprietários' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const owner = await ownerController.getOwnerById(parseInt(req.params.id));
    if (!owner) {
      return res.status(404).json({ error: 'Proprietário não encontrado' });
    }
    res.json(owner);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar proprietário' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, cpf } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Nome é obrigatório' });
    }
    const id = await ownerController.createOwner(name, email, phone, cpf);
    res.status(201).json({ id });
  } catch (error: any) {
    if (error.message.includes('UNIQUE')) {
      res.status(400).json({ error: 'CPF já cadastrado' });
    } else {
      res.status(500).json({ error: 'Erro ao criar proprietário' });
    }
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Nome é obrigatório' });
    }
    await ownerController.updateOwner(parseInt(req.params.id), name, email, phone);
    res.json({ message: 'Proprietário atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar proprietário' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await ownerController.deleteOwner(parseInt(req.params.id));
    res.json({ message: 'Proprietário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar proprietário' });
  }
});

export default router;
