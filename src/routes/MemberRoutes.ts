import { Router } from 'express';
import { MemberController } from '../application/controllers/MemberController';
import { MemberService } from '../application/services/MemberService';
import { MemberRepositoryImpl } from '../infrastructure/repositories/MemberRepositoryImpl';
import { dataSource } from '../config/database';
import { ProjectRepositoryImpl } from '../infrastructure/repositories/ProjectRepositoryImpl';
import { RoleRepositoryImpl } from '../infrastructure/repositories/RoleRepositoryImpl';

const memberRepository = new MemberRepositoryImpl(dataSource);
const projectRepository = new ProjectRepositoryImpl(dataSource);
const roleRepository = new RoleRepositoryImpl(dataSource);
const memberService = new MemberService(memberRepository, projectRepository, roleRepository);
const memberController = new MemberController(memberService);

const memberRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: Endpoints para la gestión de miembros
 */

/**
   * @swagger
   * /api/members:
   *   post:
   *     summary: Crea un nuevo rol
   *     tags: [Members]
   *     description: Crea un rol utilizando los datos proporcionados en el cuerpo de la solicitud.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               userId:
   *                 type: string
   *                 description: Id del usuario.
   *                 example: "123"
   *               projectId:
   *                 type: string
   *                 description: Id del proyecto.
   *                 example: "123"
   *               roleId:
   *                 type: string
   *                 description: Id del rol.
   *                 example: "123"
   *     responses:
   *       201:
   *         description: Miembro creado exitosamente.
   *       500:
   *         description: Error al crear el miembro.
   */
memberRoutes.post('/', (req, res) => memberController.addMember(req, res));

/**
   * @swagger
   * /api/members/proyect/{proyectId}:
   *   get:
   *     summary: Obtiene los miembros de un proyecto por su ID
   *     tags: [Members]
   *     description: Retorna los miembros del proyecto.
   *     parameters:
   *       - in: path
   *         name: proyectId
   *         required: true
   *         schema:
   *           type: string
   *         description: ID del proyecto de los miembros.
   *     responses:
   *       200:
   *         description: Miembros obtenidos exitosamente.
   *       404:
   *         description: Proyecto no encontrado o inexistente.
   */
memberRoutes.get('/proyect/:projectId', (req, res) => memberController.getMembersByProject(req, res));

/**
   * @swagger
   * /api/members/newRole/{Id}:
   *   put:
   *     summary: Actualiza el rol de un miembro
   *     tags: [Members]
   *     description: Modifica un rol existente utilizando su ID y los datos proporcionados.
   *     parameters:
   *       - in: path
   *         name: Id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID del miembro a actualizar.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               roleId:
   *                 type: string
   *                 description: Id del nuevo rol.
   *                 example: "1234"
   *     responses:
   *       200:
   *         description: Rol actualizado exitosamente.
   *       404:
   *         description: Rol no encontrado.
   *       500:
   *         description: Error al actualizar el rol.
   */
memberRoutes.put('/newRole/:id', (req, res) => memberController.updateMemberRole(req, res));

export { memberRoutes };
