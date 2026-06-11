/**
 * ROUTES - Users
 * GET  /api/users          → Listar todos los usuarios
 * POST /api/users          → Registrar usuario
 * POST /api/users/login    → Iniciar sesión (verificar credenciales)
 */

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/users — Listar todos (solo para admin)
router.get('/', async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: { id: true, name: true, email: true, role: true, createdAt: true },
            orderBy: { createdAt: 'asc' }
        });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener usuarios', detail: err.message });
    }
});

// POST /api/users/login — Iniciar sesión
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email y contraseña requeridos' });
        }
        const user = await prisma.user.findFirst({
            where: {
                email: { equals: email, mode: 'insensitive' },
                password: password
            }
        });
        if (!user) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }
        // Devolvemos sin contraseña
        const { password: _pw, ...safeUser } = user;
        res.json(safeUser);
    } catch (err) {
        res.status(500).json({ error: 'Error al iniciar sesión', detail: err.message });
    }
});

// POST /api/users — Registrar nuevo usuario
router.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Faltan campos obligatorios: name, email, password' });
        }
        const exists = await prisma.user.findUnique({ where: { email } });
        if (exists) {
            return res.status(409).json({ error: 'Este correo electrónico ya está registrado' });
        }
        const user = await prisma.user.create({
            data: { name, email, password, role: 'customer' }
        });
        const { password: _pw, ...safeUser } = user;
        res.status(201).json(safeUser);
    } catch (err) {
        res.status(500).json({ error: 'Error al registrar usuario', detail: err.message });
    }
});

module.exports = router;
