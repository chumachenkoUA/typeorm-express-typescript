import { Stop } from 'orm/entities/transit';

export class StopResponseDto {
  id: string;
  name: string;
  longitude: string;
  latitude: string;

  constructor(entity: Stop) {
    this.id = entity.id;
    this.name = entity.name;
    this.longitude = entity.longitude;
    this.latitude = entity.latitude;
  }
}
