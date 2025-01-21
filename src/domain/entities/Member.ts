import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Project } from './Project';
import { Role } from './Role';

@Entity('members')
export class Member {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Project, (project) => project.id)
  project: Project;

  @ManyToOne(() => Role, (role) => role.id)
  role: Role;

  @Column('varchar', { length: 255 })
  userId: string;
}
