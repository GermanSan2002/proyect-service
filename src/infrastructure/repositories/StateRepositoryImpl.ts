import { DataSource, Repository } from 'typeorm';
import { State } from '../../domain/entities/State';
import { StateRepository } from '../../domain/interfaces/StateRepository';

export class StateRepositoryImpl implements StateRepository {
  private repository: Repository<State>;

  constructor(private dataSource: DataSource) {
    this.repository = dataSource.getRepository(State);
  }

  // Método para guardar un nuevo estado
  async save(state: State): Promise<State> {
    try {
      return await this.repository.save(state);
    } catch (error) {
      console.error('Error al guardar el estado:', error);
      throw new Error('No se pudo guardar el estado');
    }
  }

  // Método para obtener un estado por ID
  async findById(id: string): Promise<State | null> {
    try {
      const state = await this.repository.findOne({ where: { id } });
      return state || null;
    } catch (error) {
      console.error('Error al obtener el estado por ID:', error);
      throw new Error('No se pudo obtener el estado');
    }
  }

  // Método para obtener todos los estados
  async findAll(): Promise<State[]> {
    try {
      return await this.repository.find();
    } catch (error) {
      console.error('Error al obtener todos los estados:', error);
      throw new Error('No se pudieron obtener los estados');
    }
  }

  // Método para actualizar un estado
  async update(id: string, state: State): Promise<State> {
    try {
      await this.repository.update(id, state);
      const updatedState = await this.findById(id); // Obtener el estado actualizado
      if (updatedState) {
        return updatedState;
      }
      throw new Error('Estado no encontrado después de la actualización');
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
      throw new Error('No se pudo actualizar el estado');
    }
  }

  // Método para eliminar un estado
  async delete(id: string): Promise<void> {
    try {
      await this.repository.delete(id);
    } catch (error) {
      console.error('Error al eliminar el estado:', error);
      throw new Error('No se pudo eliminar el estado');
    }
  }
}
