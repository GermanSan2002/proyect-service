import { DataSource, Repository } from 'typeorm';
import { Role } from '../../domain/entities/Role';
import { RoleRepository } from '../../domain/interfaces/RoleRepository';

export class RoleRepositoryImpl implements RoleRepository {
  private repository: Repository<Role>;

  constructor(private dataSource: DataSource) {
    this.repository = dataSource.getRepository(Role);
  }

  // Método para guardar un nuevo rol
  async save(role: Role): Promise<Role> {
    try {
      return await this.repository.save(role);
    } catch (error) {
      console.error('Error al guardar el rol:', error);
      throw new Error('No se pudo guardar el rol');
    }
  }

  // Método para obtener un rol por ID
  async findById(id: string): Promise<Role | null> {
    try {
      const role = await this.repository.findOne({ where: { id } });
      return role || null;
    } catch (error) {
      console.error('Error al obtener el rol por ID:', error);
      throw new Error('No se pudo obtener el rol');
    }
  }

  // Método para obtener todos los roles
  async findAll(): Promise<Role[]> {
    try {
      return await this.repository.find();
    } catch (error) {
      console.error('Error al obtener todos los roles:', error);
      throw new Error('No se pudieron obtener los roles');
    }
  }

  // Método para actualizar un rol
  async update(id: string, role: Role): Promise<Role> {
    try {
      await this.repository.update(id, role);
      const updatedRole = await this.findById(id); // Obtener el rol actualizado
      if (updatedRole) {
        return updatedRole;
      }
      throw new Error('Rol no encontrado después de la actualización');
    } catch (error) {
      console.error('Error al actualizar el rol:', error);
      throw new Error('No se pudo actualizar el rol');
    }
  }

  // Método para eliminar un rol
  async delete(id: string): Promise<void> {
    try {
      await this.repository.delete(id);
    } catch (error) {
      console.error('Error al eliminar el rol:', error);
      throw new Error('No se pudo eliminar el rol');
    }
  }
}