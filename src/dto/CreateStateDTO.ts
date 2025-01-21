export class CreateStateDTO {
  projectId: string;
  comments: string;
  photos: string[];
  location: {
    latitude: number;
    longitude: number;
  };
  captureDate: Date;
  userId: string;
}
