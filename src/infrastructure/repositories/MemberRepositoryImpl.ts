import { DataSource, Repository } from 'typeorm';
import { Member } from '../../domain/entities/Member';
import { MemberRepository } from '../../domain/interfaces/MemberRepository';

export class MemberRepositoryImpl implements MemberRepository {
  private repository: Repository<Member>;

  constructor(private dataSource: DataSource) {
    this.repository = dataSource.getRepository(Member);
  }

  // Método para guardar un nuevo miembro
  async save(member: Member): Promise<Member> {
    try {
      return await this.repository.save(member);
    } catch (error) {
      console.error('Error al guardar el miembro:', error);
      throw new Error('No se pudo guardar el miembro');
    }
  }

  // Método para obtener un miembro por ID
  async findById(id: string): Promise<Member | null> {
    try {
      const member = await this.repository.findOne({ where: { id } });
      return member || null;
    } catch (error) {
      console.error('Error al obtener el miembro por ID:', error);
      throw new Error('No se pudo obtener el miembro');
    }
  }

  // Método para obtener todos los miembros
  async findAll(): Promise<Member[]> {
    try {
      return await this.repository.find();
    } catch (error) {
      console.error('Error al obtener todos los miembros:', error);
      throw new Error('No se pudieron obtener los miembros');
    }
  }

  // Método para actualizar un miembro
  async update(id: string, member: Member): Promise<Member> {
    try {
      await this.repository.update(id, member);
      const updatedMember = await this.findById(id); // Obtener el miembro actualizado
      if (updatedMember) {
        return updatedMember;
      }
      throw new Error('Miembro no encontrado después de la actualización');
    } catch (error) {
      console.error('Error al actualizar el miembro:', error);
      throw new Error('No se pudo actualizar el miembro');
    }
  }

  // Método para eliminar un miembro
  async delete(id: string): Promise<void> {
    try {
      await this.repository.delete(id);
    } catch (error) {
      console.error('Error al eliminar el miembro:', error);
      throw new Error('No se pudo eliminar el miembro');
    }
  }
}
