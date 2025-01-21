import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GeoLocation } from './GeoLocalization';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('date')
  startDate: Date;

  @Column('date', { nullable: true })
  endDate: Date;

  @Column('text')
  description: string;

  @Column('varchar', { length: 100 })
  status: string;

  @OneToMany(() => GeoLocation, (geoLocation) => geoLocation.id, { cascade: true })
  pointsOfInterest: GeoLocation[];
}
