# Full‑Stack Task Manager

Este proyecto es una aplicación **full‑stack** que implementa:
- **Backend**: Node.js, Express, TypeScript, Prisma ORM, JWT + Bcrypt para autenticación.
- **Frontend**: React + TypeScript (Vite) con UI moderna (dark theme).
- **Base de datos**: SQLite para desarrollo (pronta migración a PostgreSQL). Contiene las tablas `User`, `Category`, `Product`, `Order`.
- **Docker**: Contenedores para backend, frontend y base de datos.
- **Despliegue**: Preparado para Render (puedes cambiar a Vercel/Railway).

## Scripts principales
```bash
# Backend
cd backend && npm run dev   # desarrollo con ts-node-dev
npm run build               # compilar a dist
npm start                   # ejecutar producción

# Frontend
cd frontend && npm run dev   # Vite dev server
npm run build               # generar assets estáticos
```

## Configuración de entorno
Copiar los archivos `.env.example` a `.env` en cada sub‑proyecto y rellenar los valores.
