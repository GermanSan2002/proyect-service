export class UpdateProjectDTO {
    name?: string;
    startDate?: Date;
    endDate?: Date;
    description?: string;
    status?: string;
    pointsOfInterest?: string[]; // Lista opcional de direcciones
  }
  