import { DataSource, Repository } from 'typeorm';
import { GeoLocation } from '../../domain/entities/GeoLocalization';
import { GeoLocationRepository } from '../../domain/interfaces/GeoLocationRepository';

export class GeoLocationRepositoryImpl implements GeoLocationRepository {
  private repository: Repository<GeoLocation>;

  constructor(private dataSource: DataSource) {
    this.repository = dataSource.getRepository(GeoLocation);
  }

  // Método para guardar una nueva geolocalización
  async save(geoLocation: GeoLocation): Promise<GeoLocation> {
    try {
      return await this.repository.save(geoLocation);
    } catch (error) {
      console.error('Error al guardar la geolocalización:', error);
      throw new Error('No se pudo guardar la geolocalización');
    }
  }

  // Método para obtener una geolocalización por ID
  async findById(id: string): Promise<GeoLocation | null> {
    try {
      const geoLocation = await this.repository.findOneBy({ id });
      return geoLocation ? geoLocation : null;
    } catch (error) {
      console.error('Error al obtener la geolocalización por ID:', error);
      throw new Error('No se pudo obtener la geolocalización');
    }
  }

  // Método para obtener todas las geolocalizaciones
  async findAll(): Promise<GeoLocation[]> {
    try {
      return await this.repository.find();
    } catch (error) {
      console.error('Error al obtener todas las geolocalizaciones:', error);
      throw new Error('No se pudieron obtener las geolocalizaciones');
    }
  }

  // Método para actualizar una geolocalización
  async update(id: string, geoLocation: GeoLocation): Promise<GeoLocation> {
    try {
      await this.repository.update(id, geoLocation);
      return this.findById(id) as Promise<GeoLocation>;
    } catch (error) {
      console.error('Error al actualizar la geolocalización:', error);
      throw new Error('No se pudo actualizar la geolocalización');
    }
  }

  // Método para eliminar una geolocalización
  async delete(id: string): Promise<void> {
    try {
      await this.repository.delete(id);
    } catch (error) {
      console.error('Error al eliminar la geolocalización:', error);
      throw new Error('No se pudo eliminar la geolocalización');
    }
  }
}
