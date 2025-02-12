import { Request, Response } from 'express';
import { RoleService } from '../../application/services/RoleService';

export class RoleController {
  private roleService: RoleService;

  constructor(roleService: RoleService) {
    this.roleService = roleService;
  }

  async createRole(req: Request, res: Response): Promise<void> {
    try {
      const roleData = req.body; // Suponiendo que el cuerpo contiene los datos del rol
      const createdRole = await this.roleService.createRole(roleData);
      res.status(201).json(createdRole); // Devuelve el rol creado
    } catch (error) {
      console.error('Error al crear el rol:', error);
      res.status(500).json({ message: 'No se pudo crear el rol' });
    }
  }

  async getAllRoles(req: Request, res: Response): Promise<void> {
    try {
      const roles = await this.roleService.getAllRoles();
      res.status(200).json(roles); // Devuelve todos los roles
    } catch (error) {
      console.error('Error al obtener los roles:', error);
      res.status(500).json({ message: 'No se pudieron obtener los roles' });
    }
  }

  async getRoleById(req: Request, res: Response): Promise<void> {
    const { roleId } = req.params; // El ID del rol viene en los parámetros de la ruta
    try {
      const role = await this.roleService.getRoleById(roleId);
      res.status(200).json(role); // Devuelve el rol encontrado
    } catch (error) {
      console.error('Error al obtener el rol:', error);
      res.status(404).json({ message: 'Rol no encontrado' });
    }
  }

  async updateRole(req: Request, res: Response): Promise<void> {
    const { roleId } = req.params;
    const roleData = req.body; // Los datos a actualizar vienen en el cuerpo de la solicitud
    try {
      const updatedRole = await this.roleService.updateRole(roleId, roleData);
      res.status(200).json(updatedRole); // Devuelve el rol actualizado
    } catch (error) {
      console.error('Error al actualizar el rol:', error);
      res.status(500).json({ message: 'No se pudo actualizar el rol' });
    }
  }

  /**
   * @swagger
   * /api/roles/{roleId}:
   *   delete:
   *     summary: Elimina un rol
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
  async deleteRole(req: Request, res: Response): Promise<void> {
    const { roleId } = req.params;
    try {
      await this.roleService.deleteRole(roleId);
      res.status(204).send(); // Responde con no contenido si la eliminación fue exitosa
    } catch (error) {
      console.error('Error al eliminar el rol:', error);
      res.status(500).json({ message: 'No se pudo eliminar el rol' });
    }
  }
}
