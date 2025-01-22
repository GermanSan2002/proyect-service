import { RoleRepositoryImpl } from '../../infrastructure/repositories/RoleRepositoryImpl';
import { CreateRoleDTO } from '../../dto/CreateRoleDTO';
import { UpdateRoleDTO } from '../../dto/UpdateRoleDTO';
import { Role } from '../../domain/entities/Role';

export class RoleService {
  constructor(private roleRepository: RoleRepositoryImpl) {}

  // Método para crear un nuevo rol
  async createRole(createRoleDTO: CreateRoleDTO): Promise<Role> {
    const { name, description } = createRoleDTO;

    try {
      // Crear y guardar el rol
      const newRole = new Role();
      newRole.name = name;
      newRole.description = description;

      const savedRole = await this.roleRepository.save(newRole);
      return savedRole;
    } catch (error) {
      console.error('Error al crear el rol:', error);
      throw new Error('No se pudo crear el rol');
    }
  }

  // Método para obtener todos los roles
  async getAllRoles(): Promise<Role[]> {
    try {
      const roles = await this.roleRepository.findAll();
      return roles;
    } catch (error) {
      console.error('Error al obtener los roles:', error);
      throw new Error('No se pudieron obtener los roles');
    }
  }

  // Método para obtener un rol por su ID
  async getRoleById(roleId: string): Promise<Role> {
    try {
      const role = await this.roleRepository.findById(roleId);
      if (!role) {
        throw new Error('Rol no encontrado');
      }

      return role;
    } catch (error) {
      console.error('Error al obtener el rol:', error);
      throw new Error('No se pudo obtener el rol');
    }
  }

  // Método para actualizar un rol
  async updateRole(roleId: string, updateRoleDTO: UpdateRoleDTO): Promise<Role> {
    try {
      const role = await this.roleRepository.findById(roleId);
      if (!role) {
        throw new Error('Rol no encontrado');
      }

      // Actualizar los campos según lo proporcionado en el DTO
      if (updateRoleDTO.name !== undefined) role.name = updateRoleDTO.name;
      if (updateRoleDTO.description !== undefined) role.description = updateRoleDTO.description;

      const updatedRole = await this.roleRepository.update(roleId, role);
      return updatedRole;
    } catch (error) {
      console.error('Error al actualizar el rol:', error);
      throw new Error('No se pudo actualizar el rol');
    }
  }

  // Método para eliminar un rol
  async deleteRole(roleId: string): Promise<void> {
    try {
      const role = await this.roleRepository.findById(roleId);
      if (!role) {
        throw new Error('Rol no encontrado');
      }

      await this.roleRepository.delete(roleId);
    } catch (error) {
      console.error('Error al eliminar el rol:', error);
      throw new Error('No se pudo eliminar el rol');
    }
  }
}
