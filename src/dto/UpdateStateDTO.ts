export class UpdateStateDTO {
  comments?: string;
  photos?: string[];
  location?: {
    latitude: number;
    longitude: number;
  };
  captureDate?: Date;
}
