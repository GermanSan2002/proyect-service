export class CreateProjectDTO {
    name: string;
    startDate: Date;
    endDate?: Date;
    description: string;
    status: string;
    pointsOfInterest: string[]; // Lista de direcciones (strings) para geocodificar
  }
  