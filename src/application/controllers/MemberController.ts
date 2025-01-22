import { Request, Response } from 'express';
import { MemberService } from '../services/MemberService';

export class MemberController {
  private memberService: MemberService;

  constructor(memberService: MemberService) {
    this.memberService = memberService;
  }

  async addMember(req: Request, res: Response): Promise<void> {
    try {
      const { projectId, userId, roleId } = req.body;
      const newMember = await this.memberService.addMember({ projectId, userId, roleId });
    res.status(201).json(newMember);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al agregar el miembro' });
    }
  }

  async getMembersByProject(req: Request, res: Response): Promise<void> {
    try {
      const { projectId } = req.params;
      const members = await this.memberService.getMembersByProject(projectId);
      res.status(200).json(members);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los miembros del proyecto' });
    }
  }

  async updateMemberRole(req: Request, res: Response): Promise<void> {
    try {
      const { Id } = req.params;
      const { userId, roleId } = req.body;
      
      const updatedMember = await this.memberService.updateMemberRole(Id, { roleId });
      
      res.status(200).json(updatedMember);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar el rol del miembro' });
    }
  }
}
