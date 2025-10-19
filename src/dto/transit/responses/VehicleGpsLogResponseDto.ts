import { VehicleGpsLog } from 'orm/entities/transit';

import { toIsoString } from './BaseTransitResponseDto';

export class VehicleGpsLogResponseDto {
  id: string;
  transport: {
    id: string;
    boardNumber: string;
    routeId: string | null;
  } | null;
  longitude: string;
  latitude: string;
  recordedAt: string | null;

  constructor(entity: VehicleGpsLog) {
    this.id = entity.id;
    this.transport = entity.transport
      ? {
          id: entity.transport.id,
          boardNumber: entity.transport.boardNumber,
          routeId: entity.transport.route?.id ?? null,
        }
      : null;
    this.longitude = entity.longitude;
    this.latitude = entity.latitude;
    this.recordedAt = toIsoString(entity.recordedAt);
  }
}
