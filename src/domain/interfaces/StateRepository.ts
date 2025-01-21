import { State } from "../entities/State";

export interface StateRepository {
  // Método para guardar un nuevo estado
  save(state: State): Promise<State>;

  // Método para obtener un estado por ID
  findById(id: string): Promise<State | null>;

  // Método para obtener todos los estados
  findAll(): Promise<State[]>;

  // Método para actualizar un estado
  update(id: string, state: State): Promise<State>;

  // Método para eliminar un estado
  delete(id: string): Promise<void>;
}
