import 'reflect-metadata';
import { DataSource } from 'typeorm';
import express from 'express';
import config from './config/database';
import * as dotenv from 'dotenv';

dotenv.config(); // Cargar las variables de entorno

const app = express();
const port = process.env.PORT || 3000;

// Configuración de Express
app.use(express.json()); 

// Inicialización de la base de datos con la configuración de TypeORM
const AppDataSource = new DataSource(config);

AppDataSource.initialize()
  .then(() => {
    console.log('Base de datos conectada correctamente');
    // Iniciar servidor Express
    app.listen(port, () => {
      console.log(`Servidor en ejecución en http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos', error);
  });