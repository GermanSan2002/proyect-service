import { Router } from 'express';
import { StateController } from '../application/controllers/StateController';
import { StateService } from '../application/services/StateService';
import { dataSource } from '../config/database';
import { ProjectRepositoryImpl } from '../infrastructure/repositories/ProjectRepositoryImpl';
import { StateRepositoryImpl } from '../infrastructure/repositories/StateRepositoryImpl';

// Inicialización de dependencias
const stateRepository = new StateRepositoryImpl(dataSource);
const projectRepository = new ProjectRepositoryImpl(dataSource);
const stateService = new StateService(stateRepository, projectRepository);
const stateController = new StateController(stateService);

// Configuración del router
const stateRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: States
 *   description: Endpoints para la gestión de estados
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateStateDTO:
 *       type: object
 *       properties:
 *         projectId:
 *           type: string
 *           description: ID del proyecto al que pertenece el estado.
 *         comments:
 *           type: string
 *           description: Comentarios relacionados con el estado.
 *         photos:
 *           type: array
 *           items:
 *             type: string
 *           description: URLs de las fotos relacionadas con el estado.
 *         location:
 *           type: object
 *           properties:
 *             latitude:
 *               type: number
 *               description: Latitud de la ubicación geográfica.
 *             longitude:
 *               type: number
 *               description: Longitud de la ubicación geográfica.
 *         captureDate:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de captura del estado.
 *         userId:
 *           type: string
 *           description: ID del usuario que creó el estado.
 *     UpdateStateDTO:
 *       type: object
 *       properties:
 *         comments:
 *           type: string
 *           description: Comentarios relacionados con el estado.
 *         photos:
 *           type: array
 *           items:
 *             type: string
 *           description: URLs de las fotos relacionadas con el estado.
 *         location:
 *           type: object
 *           properties:
 *             latitude:
 *               type: number
 *               description: Latitud de la ubicación geográfica.
 *             longitude:
 *               type: number
 *               description: Longitud de la ubicación geográfica.
 *         captureDate:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de captura del estado.
 */

/**
 * @swagger
 * /states:
 *   post:
 *     summary: Crear un nuevo estado.
 *     tags:
 *       - States
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateStateDTO'
 *     responses:
 *       201:
 *         description: Estado creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateStateDTO'
 *       500:
 *         description: Error al crear el estado.
 */
stateRoutes.post('/states', (req, res) => stateController.createState(req, res));

/**
 * @swagger
 * /states/{stateId}:
 *   put:
 *     summary: Actualizar un estado existente.
 *     tags:
 *       - States
 *     parameters:
 *       - in: path
 *         name: stateId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del estado a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateStateDTO'
 *     responses:
 *       200:
 *         description: Estado actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateStateDTO'
 *       500:
 *         description: Error al actualizar el estado.
 */
stateRoutes.put('/states/:stateId', (req, res) => stateController.updateState(req, res));

/**
 * @swagger
 * /states/{stateId}:
 *   get:
 *     summary: Obtener un estado por su ID.
 *     tags:
 *       - States
 *     parameters:
 *       - in: path
 *         name: stateId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del estado a obtener.
 *     responses:
 *       200:
 *         description: Estado obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateStateDTO'
 *       500:
 *         description: Error al obtener el estado.
 */
stateRoutes.get('/states/:stateId', (req, res) => stateController.getState(req, res));

/**
 * @swagger
 * /states:
 *   get:
 *     summary: Obtener todos los estados.
 *     tags:
 *       - States
 *     responses:
 *       200:
 *         description: Lista de estados obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CreateStateDTO'
 *       500:
 *         description: Error al obtener los estados.
 */
stateRoutes.get('/states', (req, res) => stateController.getAllStates(req, res));

export default stateRoutes;