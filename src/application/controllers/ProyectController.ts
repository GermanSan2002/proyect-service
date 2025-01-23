import { Request, Response } from 'express';
import { ProjectService } from '../../application/services/ProjectService';
import { CreateProjectDTO } from '../../dto/CreateProjectDTO';
import { UpdateProjectDTO } from '../../dto/UpdateProjectDTO';

export class ProjectController {
  private projectService: ProjectService

  constructor(projectService: ProjectService) {
    this.projectService = projectService;
  }

  // Crear un nuevo proyecto
  async createProject(req: Request, res: Response): Promise<void> {
    try {
      const createProjectDTO: CreateProjectDTO = req.body;
      const project = await this.projectService.createProject(createProjectDTO);
      res.status(201).json(project);
    } catch (error) {
      console.error('Error en createProject:', error);
      res.status(500).json({ message: 'Error al crear el proyecto', error: error.message });
    }
  }

  // Actualizar un proyecto existente
  async updateProject(req: Request, res: Response): Promise<void> {
    try {
      const projectId: string = req.params.id;
      const updateProjectDTO: UpdateProjectDTO = req.body;
      const updatedProject = await this.projectService.updateProject(projectId, updateProjectDTO);
      res.status(200).json(updatedProject);
    } catch (error) {
      console.error('Error en updateProject:', error);
      res.status(500).json({ message: 'Error al actualizar el proyecto', error: error.message });
    }
  }

  // Eliminar un proyecto por ID
  async deleteProject(req: Request, res: Response): Promise<void> {
    try {
      const projectId: string = req.params.id;
      await this.projectService.deleteProject(projectId);
      res.status(204).send();
    } catch (error) {
      console.error('Error en deleteProject:', error);
      res.status(500).json({ message: 'Error al eliminar el proyecto', error: error.message });
    }
  }

  // Obtener un proyecto por ID
  async getProject(req: Request, res: Response): Promise<void> {
    try {
      const projectId: string = req.params.id;
      const project = await this.projectService.getProjectById(projectId);
      res.status(200).json(project);
    } catch (error) {
      console.error('Error en getProject:', error);
      res.status(500).json({ message: 'Error al obtener el proyecto', error: error.message });
    }
  }

  // Obtener todos los proyectos
  async getAllProjects(req: Request, res: Response): Promise<void> {
    try {
      const projects = await this.projectService.getAllProjects();
      res.status(200).json(projects);
    } catch (error) {
      console.error('Error en getAllProjects:', error);
      res.status(500).json({ message: 'Error al obtener los proyectos', error: error.message });
    }
  }
}