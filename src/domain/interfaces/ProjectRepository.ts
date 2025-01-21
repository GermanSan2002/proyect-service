import { Project } from "../entities/Project";

export interface ProjectRepository {
  // Método para guardar un nuevo proyecto
  save(project: Project): Promise<Project>;

  // Método para obtener un proyecto por ID
  findById(id: string): Promise<Project | null>;

  // Método para obtener todos los proyectos
  findAll(): Promise<Project[]>;

  // Método para actualizar un proyecto
  update(id: string, project: Project): Promise<Project>;

  // Método para eliminar un proyecto
  delete(id: string): Promise<void>;
}
