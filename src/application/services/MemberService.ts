import { MemberRepositoryImpl } from '../../infrastructure/repositories/MemberRepositoryImpl';
import { RoleRepositoryImpl } from '../../infrastructure/repositories/RoleRepositoryImpl';
import { ProjectRepositoryImpl } from '../../infrastructure/repositories/ProjectRepositoryImpl';
import { Member } from '../../domain/entities/Member';
import { AddMemberDTO } from '../../dto/AddMemberDTO';
import { UpdateMemberRoleDTO } from '../../dto/UpdateMemberRoleDTO';

export class MemberService {
  constructor(
    private memberRepository: MemberRepositoryImpl,
    private projectRepository: ProjectRepositoryImpl,
    private roleRepository: RoleRepositoryImpl
  ) {}

  async addMember(addMemberDTO: AddMemberDTO): Promise<Member> {
    const { userId, projectId, roleId } = addMemberDTO;

    const project = await this.validateProjectExists(projectId);
    const role = await this.validateRoleExists(roleId);

    const newMember = new Member();
    newMember.userId = userId;
    newMember.project = project;
    newMember.role = role;

    return await this.memberRepository.save(newMember);
  }

  // Método para obtener todos los miembros de un proyecto
  async getMembersByProject(projectId: string): Promise<Member[]> {
    await this.validateProjectExists(projectId);

    const members = await this.memberRepository.findAll();
    return members.filter((member) => member.project.id === projectId);
  }

  // Método para actualizar el rol de un miembro
  async updateMemberRole(id: string,updateMemberRoleDTO: UpdateMemberRoleDTO): Promise<Member> {
    const { roleId } = updateMemberRoleDTO;

    const member = await this.validateMemberExists(id);
    const role = await this.validateRoleExists(roleId);

    member.role = role;

    return await this.memberRepository.update(id, member);
  }

  // Métodos privados para validaciones reutilizables
  private async validateProjectExists(projectId: string) {
    const project = await this.projectRepository.findById(projectId);
    if (!project) {
      throw new Error('Proyecto no encontrado');
    }
    return project;
  }

  private async validateRoleExists(roleId: string) {
    const role = await this.roleRepository.findById(roleId);
    if (!role) {
      throw new Error('Rol no encontrado');
    }
    return role;
  }

  private async validateMemberExists(Id: string) {
    const member = await this.memberRepository.findById(Id);
    if (!member) {
      throw new Error('Miembro no encontrado');
    }
    return member;
  }
}
