import { Role } from "../entities/Role";

export interface RoleRepository {
  // Método para guardar un nuevo rol
  save(role: Role): Promise<Role>;

  // Método para obtener un rol por ID
  findById(id: string): Promise<Role | null>;

  // Método para obtener todos los roles
  findAll(): Promise<Role[]>;

  // Método para actualizar un rol
  update(id: string, role: Role): Promise<Role>;

  // Método para eliminar un rol
  delete(id: string): Promise<void>;
}
