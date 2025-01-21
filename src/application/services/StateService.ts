import { StateRepositoryImpl } from '../../infrastructure/repositories/StateRepositoryImpl';
import { ProjectRepositoryImpl } from '../../infrastructure/repositories/ProjectRepositoryImpl';
import { CreateStateDTO } from '../../dto/CreateStateDTO';
import { UpdateStateDTO } from '../../dto/UpdateStateDTO';
import { State } from 'src/domain/entities/State';
import { GeoLocation } from 'src/domain/entities/GeoLocalization';

export class StateService {
  constructor(
    private stateRepository: StateRepositoryImpl,
    private projectRepository: ProjectRepositoryImpl
  ) {}

  // Método para crear un nuevo estado
  async createState(createStateDTO: CreateStateDTO): Promise<State> {
    const { projectId, comments, photos, location, captureDate, userId } = createStateDTO;

    try {
      // Validar si el proyecto existe
      const project = await this.projectRepository.findById(projectId);
      if (!project) {
        throw new Error('Proyecto no encontrado');
      }

      // Crear la ubicación geográfica
      const geoLocation = new GeoLocation();
      geoLocation.latitude = location.latitude;
      geoLocation.longitude = location.longitude;

      // Crear el estado
      const newState = new State();
      newState.project = project;
      newState.comments = comments;
      newState.photos = photos;
      newState.location = geoLocation;
      newState.captureDate = captureDate;
      newState.userId = userId;

      const savedState = await this.stateRepository.save(newState);
      return savedState;
    } catch (error) {
      console.error('Error al crear el estado:', error);
      throw new Error('No se pudo crear el estado');
    }
  }

  // Método para obtener todos los estados
  async getAllStates(): Promise<State[]> {
    try {
      const states = await this.stateRepository.findAll();
      return states;
    } catch (error) {
      console.error('Error al obtener los estados:', error);
      throw new Error('No se pudieron obtener los estados');
    }
  }

  // Método para obtener un estado por su ID
  async getStateById(stateId: string): Promise<State> {
    try {
      const state = await this.stateRepository.findById(stateId);
      if (!state) {
        throw new Error('Estado no encontrado');
      }

      return state;
    } catch (error) {
      console.error('Error al obtener el estado:', error);
      throw new Error('No se pudo obtener el estado');
    }
  }

  // Método para actualizar un estado
  async updateState(stateId: string, updateStateDTO: UpdateStateDTO): Promise<State> {
    try {
      const state = await this.stateRepository.findById(stateId);
      if (!state) {
        throw new Error('Estado no encontrado');
      }

      // Actualizar los campos según lo proporcionado en el DTO
      if (updateStateDTO.comments !== undefined) state.comments = updateStateDTO.comments;
      if (updateStateDTO.photos !== undefined) state.photos = updateStateDTO.photos;

      if (updateStateDTO.location) {
        const geoLocation = new GeoLocation();
        geoLocation.latitude = updateStateDTO.location.latitude;
        geoLocation.longitude = updateStateDTO.location.longitude;
        state.location = geoLocation;
      }

      if (updateStateDTO.captureDate !== undefined) state.captureDate = updateStateDTO.captureDate;

      const updatedState = await this.stateRepository.update(stateId, state);
      return updatedState;
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
      throw new Error('No se pudo actualizar el estado');
    }
  }

  // Método para eliminar un estado
  async deleteState(stateId: string): Promise<void> {
    try {
      const state = await this.stateRepository.findById(stateId);
      if (!state) {
        throw new Error('Estado no encontrado');
      }

      await this.stateRepository.delete(stateId);
    } catch (error) {
      console.error('Error al eliminar el estado:', error);
      throw new Error('No se pudo eliminar el estado');
    }
  }
}
