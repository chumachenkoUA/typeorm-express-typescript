import { UserGpsLog } from 'orm/entities/transit';

import { toIsoString } from './BaseTransitResponseDto';

export class UserGpsLogResponseDto {
  id: string;
  passenger: {
    id: string;
    fullName: string;
    email: string;
  } | null;
  longitude: string;
  latitude: string;
  recordedAt: string | null;

  constructor(entity: UserGpsLog) {
    this.id = entity.id;
    this.passenger = entity.passenger
      ? {
          id: entity.passenger.id,
          fullName: entity.passenger.fullName,
          email: entity.passenger.email,
        }
      : null;
    this.longitude = entity.longitude;
    this.latitude = entity.latitude;
    this.recordedAt = toIsoString(entity.recordedAt);
  }
}
