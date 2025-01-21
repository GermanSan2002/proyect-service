import axios from "axios";
import { GeoLocation } from "../../domain/entities/GeoLocalization";
import * as dotenv from 'dotenv';

dotenv.config();

export class OpenCageGeoLocationService {
  private static API_URL = "https://api.opencagedata.com/geocode/v1/json";
  private static API_KEY = process.env.API_GEOLOCALIZATION_KEY; // Reemplaza con tu clave API

  /**
   * Geocodifica una dirección y devuelve las coordenadas.
   * @param address Dirección a buscar
   * @returns Coordenadas (latitud y longitud)
   */
  static async geocodeAddress(address: string): Promise<GeoLocation | null> {
    try {
      const response = await axios.get(this.API_URL, {
        params: {
          q: address,
          key: this.API_KEY,
          limit: 1,
          no_annotations: 1,
        },
      });

      if (response.data && response.data.results.length > 0) {
        const location = response.data.results[0].geometry;

        let result = new GeoLocation();
        
        result.latitude = location.lat;
        result.longitude = location.lng;

        return result;
      }

      return null;
    } catch (error) {
      console.error("Error al geocodificar la dirección:", error);
      throw new Error("No se pudo obtener la geolocalización");
    }
  }

  /**
   * Geocodificación inversa: obtiene una dirección a partir de coordenadas.
   * @param latitude Latitud
   * @param longitude Longitud
   * @returns Dirección en texto
   */
  static async reverseGeocode(latitude: number, longitude: number): Promise<string | null> {
    try {
      const response = await axios.get(this.API_URL, {
        params: {
          q: `${latitude},${longitude}`,
          key: this.API_KEY,
          limit: 1,
          no_annotations: 1,
        },
      });

      if (response.data && response.data.results.length > 0) {
        return response.data.results[0].formatted;
      }

      return null;
    } catch (error) {
      console.error("Error al obtener la dirección inversa:", error);
      throw new Error("No se pudo obtener la dirección inversa");
    }
  }
}
