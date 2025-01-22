import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Microservicio para gestion de proyectos',
      version: '1.0.0',
      description: 'API para gestionar roles en el sistema',
    },
    servers: [
      {
        url: 'http://localhost:3000/api', // Cambia según tu configuración
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Ruta a tus archivos con documentación Swagger
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('Swagger UI disponible en http://localhost:3000/api-docs');
};
