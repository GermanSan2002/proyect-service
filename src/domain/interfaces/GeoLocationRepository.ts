import { GeoLocation } from "../entities/GeoLocalization";

export interface GeoLocationRepository {
  // Método para guardar una nueva geolocalización
  save(geoLocation: GeoLocation): Promise<GeoLocation>;

  // Método para obtener una geolocalización por ID
  findById(id: string): Promise<GeoLocation | null>;

  // Método para obtener todas las geolocalizaciones
  findAll(): Promise<GeoLocation[]>;

  // Método para actualizar una geolocalización
  update(id: string, geoLocation: GeoLocation): Promise<GeoLocation>;

  // Método para eliminar una geolocalización
  delete(id: string): Promise<void>;
}
