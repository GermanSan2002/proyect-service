import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Project } from './Project';
import { GeoLocation } from './GeoLocalization';

@Entity('states')
export class State {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Project, (project) => project.id)
  project: Project;

  @Column('text')
  comments: string;

  @Column('text', { array: true })
  photos: string[];

  @ManyToOne(() => GeoLocation, (geoLocation) => geoLocation.id, { cascade: true })
  location: GeoLocation;

  @Column('date')
  captureDate: Date;

  @Column('varchar', { length: 255 })
  userId: string;
}
