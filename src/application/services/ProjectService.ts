import { ProjectRepositoryImpl } from '../../infrastructure/repositories/ProjectRepositoryImpl';
import { GeoLocation } from '../../domain/entities/GeoLocalization';
import { CreateProjectDTO } from '../../dto/CreateProjectDTO';
import { UpdateProjectDTO } from '../../dto/UpdateProjectDTO';
import { Project } from '../../domain/entities/Project';
import { OpenCageGeoLocationService } from '../../infrastructure/services/OpenCageGeoLocationService';
import { Role } from '../../domain/entities/Role';

export class ProjectService {
  constructor(
    private projectRepository: ProjectRepositoryImpl,
  ) {}

  // Método para crear un proyecto
  async createProject(createProjectDTO: CreateProjectDTO): Promise<Role> {
    const { name, startDate, endDate, description, status, pointsOfInterest } = createProjectDTO;

    try {
      // Geocodificar las direcciones
      const geoLocations: GeoLocation[] = [];
      for (const address of pointsOfInterest) {
        const location = await OpenCageGeoLocationService.geocodeAddress(address);
        geoLocations.push(location);
      }

      const newProject = new Project();
      newProject.name = name;
      newProject.startDate = startDate;
      newProject.endDate = endDate;
      newProject.description = description;
      newProject.status = status;
      newProject.pointsOfInterest = geoLocations;

      const savedProject = await this.projectRepository.save(newProject);
      return savedProject;
    } catch (error) {
      console.error('Error al crear el proyecto:', error);
      throw new Error('No se pudo crear el proyecto');
    }
  }

  // Método para obtener todos los proyectos
  async getAllProjects(): Promise<Project[]> {
    try {
      const projects = await this.projectRepository.findAll();
      return projects;
    } catch (error) {
      console.error('Error al obtener los proyectos:', error);
      throw new Error('No se pudieron obtener los proyectos');
    }
  }

  // Método para obtener un proyecto por ID
  async getProjectById(projectId: string): Promise<Project> {
    try {
      const project = await this.projectRepository.findById(projectId);
      if (!project) {
        throw new Error('Proyecto no encontrado');
      }

      return project;
    } catch (error) {
      console.error('Error al obtener el proyecto:', error);
      throw new Error('No se pudo obtener el proyecto');
    }
  }

  // Método para actualizar un proyecto
  async updateProject(projectId: string, updateProjectDTO: UpdateProjectDTO): Promise<Project> {
    try {
      const project = await this.projectRepository.findById(projectId);
      if (!project) {
        throw new Error('Proyecto no encontrado');
      }

      // Actualizar los campos según lo proporcionado en el DTO
      if (updateProjectDTO.name !== undefined) project.name = updateProjectDTO.name;
      if (updateProjectDTO.startDate !== undefined) project.startDate = updateProjectDTO.startDate;
      if (updateProjectDTO.endDate !== undefined) project.endDate = updateProjectDTO.endDate;
      if (updateProjectDTO.description !== undefined) project.description = updateProjectDTO.description;
      if (updateProjectDTO.status !== undefined) project.status = updateProjectDTO.status;

      // Geocodificar nuevas direcciones si son proporcionadas
      if (updateProjectDTO.pointsOfInterest !== undefined) {
        const geoLocations: GeoLocation[] = [];
        for (const address of updateProjectDTO.pointsOfInterest) {
          const location = await OpenCageGeoLocationService.geocodeAddress(address);
          geoLocations.push(location);
        }
        project.pointsOfInterest = geoLocations;
      }

      const updatedProject = await this.projectRepository.update(projectId, project);
      return updatedProject;
    } catch (error) {
      console.error('Error al actualizar el proyecto:', error);
      throw new Error('No se pudo actualizar el proyecto');
    }
  }

  // Método para eliminar un proyecto
  async deleteProject(projectId: string): Promise<void> {
    try {
      const project = await this.projectRepository.findById(projectId);
      if (!project) {
        throw new Error('Proyecto no encontrado');
      }

      await this.projectRepository.delete(projectId);
    } catch (error) {
      console.error('Error al eliminar el proyecto:', error);
      throw new Error('No se pudo eliminar el proyecto');
    }
  }

  // Método para agregar un punto de interés al proyecto
  async addPointOfInterest(projectId: string, pointOfInterest: GeoLocation): Promise<Project> {
    try {
      const project = await this.projectRepository.findById(projectId);
      if (!project) {
        throw new Error('Proyecto no encontrado');
      }

      project.pointsOfInterest.push(pointOfInterest);
      const updatedProject = await this.projectRepository.update(projectId, project);
      return updatedProject;
    } catch (error) {
      console.error('Error al agregar el punto de interés:', error);
      throw new Error('No se pudo agregar el punto de interés');
    }
  }
}
