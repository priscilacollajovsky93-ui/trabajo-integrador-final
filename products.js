/**
 * ROUTES - Products
 * GET    /api/products        → Listar todos los productos
 * POST   /api/products        → Crear nuevo producto
 * PUT    /api/products/:id    → Actualizar producto
 * DELETE /api/products/:id    → Eliminar producto
 */

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/products — Listar todos
router.get('/', async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: 'asc' }
        });
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener productos', detail: err.message });
    }
});

// GET /api/products/:id — Obtener uno
router.get('/:id', async (req, res) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: req.params.id }
        });
        if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener producto', detail: err.message });
    }
});

// POST /api/products — Crear nuevo
router.post('/', async (req, res) => {
    try {
        const { id, code, title, description, category, price, stock, image } = req.body;
        if (!code || !title || !category || !price) {
            return res.status(400).json({ error: 'Faltan campos obligatorios: code, title, category, price' });
        }
        const product = await prisma.product.create({
            data: {
                id: id || `prod-${Date.now()}`,
                code,
                title,
                description: description || '',
                category,
                price: parseFloat(price),
                stock: parseInt(stock) || 0,
                image: image || '',
                salesCount: 0
            }
        });
        res.status(201).json(product);
    } catch (err) {
        if (err.code === 'P2002') {
            return res.status(409).json({ error: 'El código de producto ya existe' });
        }
        res.status(500).json({ error: 'Error al crear producto', detail: err.message });
    }
});

// PUT /api/products/:id — Actualizar
router.put('/:id', async (req, res) => {
    try {
        const { title, description, category, price, stock, image, code, salesCount } = req.body;
        const data = {};
        if (title !== undefined)       data.title = title;
        if (description !== undefined) data.description = description;
        if (category !== undefined)    data.category = category;
        if (price !== undefined)       data.price = parseFloat(price);
        if (stock !== undefined)       data.stock = parseInt(stock);
        if (image !== undefined)       data.image = image;
        if (code !== undefined)        data.code = code;
        if (salesCount !== undefined)  data.salesCount = parseInt(salesCount);

        const product = await prisma.product.update({
            where: { id: req.params.id },
            data
        });
        res.json(product);
    } catch (err) {
        if (err.code === 'P2025') {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(500).json({ error: 'Error al actualizar producto', detail: err.message });
    }
});

// DELETE /api/products/:id — Eliminar
router.delete('/:id', async (req, res) => {
    try {
        await prisma.product.delete({ where: { id: req.params.id } });
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (err) {
        if (err.code === 'P2025') {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(500).json({ error: 'Error al eliminar producto', detail: err.message });
    }
});

module.exports = router;
