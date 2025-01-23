import { Router } from 'express';
import { ProjectRepositoryImpl } from '../infrastructure/repositories/ProjectRepositoryImpl';
import { dataSource } from '../config/database';
import { ProjectService } from '../application/services/ProjectService';
import { ProjectController } from '../application/controllers/ProyectController';

const proyectRepository = new ProjectRepositoryImpl(dataSource);
const proyectService = new ProjectService(proyectRepository);
const proyectController = new ProjectController(proyectService);

const proyectRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Endpoints para la gestión de proyectos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateProjectDTO:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del proyecto.
 *           example: "Proyecto Alpha"
 *         startDate:
 *           type: string
 *           format: date
 *           description: Fecha de inicio del proyecto.
 *           example: "2025-01-01"
 *         endDate:
 *           type: string
 *           format: date
 *           description: Fecha de finalización del proyecto.
 *           example: "2025-12-31"
 *         description:
 *           type: string
 *           description: Descripción del proyecto.
 *           example: "Este es un proyecto de ejemplo."
 *         status:
 *           type: string
 *           description: Estado del proyecto.
 *           example: "En progreso"
 *         pointsOfInterest:
 *           type: array
 *           items:
 *             type: string
 *           description: Lista de direcciones a geocodificar.
 *           example: ["123 Main St, Ciudad, País"]
 *     UpdateProjectDTO:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del proyecto.
 *           example: "Proyecto Beta"
 *         startDate:
 *           type: string
 *           format: date
 *           description: Fecha de inicio del proyecto.
 *           example: "2025-02-01"
 *         endDate:
 *           type: string
 *           format: date
 *           description: Fecha de finalización del proyecto.
 *           example: "2025-11-30"
 *         description:
 *           type: string
 *           description: Descripción del proyecto.
 *           example: "Descripción actualizada del proyecto."
 *         status:
 *           type: string
 *           description: Estado del proyecto.
 *           example: "Completado"
 *         pointsOfInterest:
 *           type: array
 *           items:
 *             type: string
 *           description: Lista de direcciones a geocodificar.
 *           example: ["456 Elm St, Ciudad, País"]
 *     Project:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Identificador único del proyecto.
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         name:
 *           type: string
 *           description: Nombre del proyecto.
 *           example: "Proyecto Alpha"
 *         startDate:
 *           type: string
 *           format: date
 *           description: Fecha de inicio del proyecto.
 *           example: "2025-01-01"
 *         endDate:
 *           type: string
 *           format: date
 *           description: Fecha de finalización del proyecto.
 *           example: "2025-12-31"
 *         description:
 *           type: string
 *           description: Descripción del proyecto.
 *           example: "Este es un proyecto de ejemplo."
 *         status:
 *           type: string
 *           description: Estado del proyecto.
 *           example: "En progreso"
 *         pointsOfInterest:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/GeoLocation'
 *           description: Lista de ubicaciones geográficas asociadas al proyecto.
 *     GeoLocation:
 *       type: object
 *       properties:
 *         latitude:
 *           type: number
 *           format: float
 *           description: Latitud de la ubicación.
 *           example: -34.6037
 *         longitude:
 *           type: number
 *           format: float
 *           description: Longitud de la ubicación.
 *           example: -58.3816
 */

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Crea un nuevo proyecto.
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProjectDTO'
 *     responses:
 *       201:
 *         description: Proyecto creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       400:
 *         description: Error en los datos proporcionados.
 */
proyectRoutes.post('/', (req, res) => proyectController.createProject(req, res));

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Obtiene todos los proyectos.
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: Lista de proyectos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 */
proyectRoutes.get('/', (req, res) => proyectController.getAllProjects(req, res));

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Obtiene un proyecto por su ID.
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del proyecto.
 *     responses:
 *       200:
 *         description: Proyecto obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Proyecto no encontrado.
 */
proyectRoutes.get('/:id', (req, res) => proyectController.getProject(req, res));

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Actualiza un proyecto por su ID.
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del proyecto.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProjectDTO'
 *     responses:
 *       200:
 *         description: Proyecto actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       400:
 *         description: Error en los datos proporcionados.
 *       404:
 *         description: Proyecto no encontrado.
 */
proyectRoutes.put('/:id', (req, res) => proyectController.updateProject(req, res));

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Elimina un proyecto por su ID.
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del proyecto.
 *     responses:
 *       204:
 *         description: Proyecto eliminado exitosamente.
 *       404:
 *         description: Proyecto no encontrado.
 */
proyectRoutes.delete('/:id', (req, res) => proyectController.deleteProject(req, res));

export default proyectRoutes;
