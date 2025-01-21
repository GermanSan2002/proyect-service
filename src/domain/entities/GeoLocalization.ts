import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('geo_locations')
export class GeoLocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;
}
