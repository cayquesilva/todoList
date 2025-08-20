import express from 'express';
import pool from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Aplicar middleware de autenticação em todas as rotas
router.use(authenticateToken);

// Listar tarefas do usuário
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, title, is_complete, created_at, updated_at FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Criar nova tarefa
router.post('/', async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Título da tarefa é obrigatório' });
    }

    const result = await pool.query(
      'INSERT INTO tasks (title, user_id) VALUES ($1, $2) RETURNING id, title, is_complete, created_at, updated_at',
      [title.trim(), req.user.userId]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Atualizar status da tarefa
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { is_complete } = req.body;

    if (typeof is_complete !== 'boolean') {
      return res.status(400).json({ error: 'is_complete deve ser um boolean' });
    }

    const result = await pool.query(
      'UPDATE tasks SET is_complete = $1 WHERE id = $2 AND user_id = $3 RETURNING id, title, is_complete, created_at, updated_at',
      [is_complete, id, req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Deletar tarefa
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    res.json({ message: 'Tarefa deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default router;