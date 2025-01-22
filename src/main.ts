import 'reflect-metadata';
import express from 'express';
import * as dotenv from 'dotenv';
import { dataSource } from './config/database';
import { roleRoutes } from './routes/RoleRoutes';
import { setupSwagger } from './config/swagger';
import { memberRoutes } from './routes/MemberRoutes';


// Cargar las variables de entorno
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Configuración de Express
app.use(express.json());

// Configurar Swagger
setupSwagger(app);

// Rutas de roles
app.use('/api/roles', roleRoutes);
// Rutas de miebros
app.use('/api/members', memberRoutes);

// Inicialización de la base de datos con la configuración de TypeORM
dataSource.initialize()
  .then(() => {
    console.log('Base de datos conectada correctamente');
    
    // Iniciar servidor Express
    app.listen(port, () => {
      console.log(`Servidor en ejecución en http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos', error);
    // Finalizar el proceso si la conexión falla
    process.exit(1);
  });

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Algo salió mal en el servidor' });
});