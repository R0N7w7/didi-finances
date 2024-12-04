import express from 'express';
import prisma from './modules/common/prisma';
import { appRouter } from './rest/router';
import { errorHandler } from './modules/common/middlewares/error.middleware';

// Inicialización de Prisma Client

// Inicializar Express
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Para parsear JSON

// Rutas de ejemplo
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API!');
});

app.use(appRouter);

app.use(errorHandler as any);

process.on('SIGTERM', async () => {
    await prisma.$disconnect();
    process.exit(0);
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
