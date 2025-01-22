import { Router } from 'express';
import { RoleController } from '../application/controllers/RoleController';
import { RoleService } from '../application/services/RoleService';
import { dataSource } from '../config/database';
import { RoleRepositoryImpl } from '../infrastructure/repositories/RoleRepositoryImpl';

const roleRepository = new RoleRepositoryImpl(dataSource);
const roleService = new RoleService(roleRepository);
const roleController = new RoleController(roleService);

const roleRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Endpoints para la gestión de roles
 */

/**
   * @swagger
   * /api/roles:
   *   post:
   *     summary: Crea un nuevo rol
   *     tags: [Roles]
   *     description: Crea un rol utilizando los datos proporcionados en el cuerpo de la solicitud.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 description: Nombre del rol.
   *                 example: "Administrador"
   *               description:
   *                 type: string
   *                 description: Descripcion del rol.
   *                 example: "Administrador de proyectos"
   *     responses:
   *       201:
   *         description: Rol creado exitosamente.
   *       500:
   *         description: Error al crear el rol.
   */
roleRoutes.post('/', (req, res) => roleController.createRole(req, res));

/**
   * @swagger
   * /api/roles:
   *   get:
   *     summary: Obtiene todos los roles
   *     tags: [Roles]
   *     description: Retorna una lista de todos los roles existentes.
   *     responses:
   *       200:
   *         description: Lista de roles obtenida exitosamente.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: string
   *                     description: ID del rol.
   *                     example: "1"
   *                   name:
   *                     type: string
   *                     description: Nombre del rol.
   *                     example: "Administrador"
   *       500:
   *         description: Error al obtener los roles.
   */
roleRoutes.get('/', (req, res) => roleController.getAllRoles(req, res));

/**
   * @swagger
   * /api/roles/{roleId}:
   *   get:
   *     summary: Obtiene un rol por ID
   *     tags: [Roles]
   *     description: Retorna un rol específico utilizando su ID.
   *     parameters:
   *       - in: path
   *         name: roleId
   *         required: true
   *         schema:
   *           type: string
   *         description: ID del rol a obtener.
   *     responses:
   *       200:
   *         description: Rol obtenido exitosamente.
   *       404:
   *         description: Rol no encontrado.
   */
roleRoutes.get('/:roleId', (req, res) => roleController.getRoleById(req, res));

  /**
   * @swagger
   * /api/roles/{roleId}:
   *   put:
   *     summary: Actualiza un rol
   *     tags: [Roles]
   *     description: Modifica un rol existente utilizando su ID y los datos proporcionados.
   *     parameters:
   *       - in: path
   *         name: roleId
   *         required: true
   *         schema:
   *           type: string
   *         description: ID del rol a actualizar.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 description: Nuevo nombre del rol.
   *                 example: "Editor"
   *               description:
   *                 type: string
   *                 description: Nueva descripción del rol.
   *                 example: "Permiso para editar"
   *     responses:
   *       200:
   *         description: Rol actualizado exitosamente.
   *       404:
   *         description: Rol no encontrado.
   *       500:
   *         description: Error al actualizar el rol.
   */
roleRoutes.put('/:roleId', (req, res) => roleController.updateRole(req, res));

/**
   * @swagger
   * /api/roles/{roleId}:
   *   delete:
   *     summary: Elimina un rol
   *     tags: [Roles]
   *     description: Borra un rol existente utilizando su ID.
   *     parameters:
   *       - in: path
   *         name: roleId
   *         required: true
   *         schema:
   *           type: string
   *         description: ID del rol a eliminar.
   *     responses:
   *       204:
   *         description: Rol eliminado exitosamente.
   *       500:
   *         description: Error al eliminar el rol.
   */
roleRoutes.delete('/:roleId', (req, res) => roleController.deleteRole(req, res));

export { roleRoutes };
