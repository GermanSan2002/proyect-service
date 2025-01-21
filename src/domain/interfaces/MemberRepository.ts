import { Member } from "../entities/Member";

export interface MemberRepository {
  // Método para guardar un nuevo miembro
  save(member: Member): Promise<Member>;

  // Método para obtener un miembro por ID
  findById(id: string): Promise<Member | null>;

  // Método para obtener todos los miembros
  findAll(): Promise<Member[]>;

  // Método para actualizar un miembro
  update(id: string, member: Member): Promise<Member>;

  // Método para eliminar un miembro
  delete(id: string): Promise<void>;
}
