import { DataSource, Repository } from 'typeorm';
import { Project } from '../../domain/entities/Project';
import { ProjectRepository } from '../../domain/interfaces/ProjectRepository';

export class ProjectRepositoryImpl implements ProjectRepository {
  private repository: Repository<Project>;

  constructor(private dataSource: DataSource) {
    this.repository = dataSource.getRepository(Project);
  }

  // Método para guardar un nuevo proyecto
  async save(project: Project): Promise<Project> {
    try {
      return await this.repository.save(project);
    } catch (error) {
      console.error('Error al guardar el proyecto:', error);
      throw new Error('No se pudo guardar el proyecto');
    }
  }

  // Método para obtener un proyecto por ID
  async findById(id: string): Promise<Project | null> {
    try {
      const project = await this.repository.findOne({ where: { id } });
      return project || null;
    } catch (error) {
      console.error('Error al obtener el proyecto por ID:', error);
      throw new Error('No se pudo obtener el proyecto');
    }
  }

  // Método para obtener todos los proyectos
  async findAll(): Promise<Project[]> {
    try {
      return await this.repository.find();
    } catch (error) {
      console.error('Error al obtener todos los proyectos:', error);
      throw new Error('No se pudieron obtener los proyectos');
    }
  }

  // Método para actualizar un proyecto
  async update(id: string, project: Project): Promise<Project> {
    try {
      await this.repository.update(id, project);
      const updatedProject = await this.findById(id); // Obtener el proyecto actualizado
      if (updatedProject) {
        return updatedProject;
      }
      throw new Error('Proyecto no encontrado después de la actualización');
    } catch (error) {
      console.error('Error al actualizar el proyecto:', error);
      throw new Error('No se pudo actualizar el proyecto');
    }
  }

  // Método para eliminar un proyecto
  async delete(id: string): Promise<void> {
    try {
      await this.repository.delete(id);
    } catch (error) {
      console.error('Error al eliminar el proyecto:', error);
      throw new Error('No se pudo eliminar el proyecto');
    }
  }
}
