import { RoutePoint } from 'orm/entities/transit';

export class RoutePointResponseDto {
  id: string;
  routeId: string | null;
  longitude: string;
  latitude: string;
  previousPointId: string | null;
  nextPointId: string | null;
  previousPoint: {
    id: string;
    longitude: string;
    latitude: string;
  } | null;
  nextPoint: {
    id: string;
    longitude: string;
    latitude: string;
  } | null;

  constructor(entity: RoutePoint) {
    this.id = entity.id;
    this.routeId = entity.route?.id ?? null;
    this.longitude = entity.longitude;
    this.latitude = entity.latitude;
    this.previousPointId = entity.previousPoint?.id ?? null;
    this.nextPointId = entity.nextPoint?.id ?? null;
    this.previousPoint = entity.previousPoint
      ? {
          id: entity.previousPoint.id,
          longitude: entity.previousPoint.longitude,
          latitude: entity.previousPoint.latitude,
        }
      : null;
    this.nextPoint = entity.nextPoint
      ? {
          id: entity.nextPoint.id,
          longitude: entity.nextPoint.longitude,
          latitude: entity.nextPoint.latitude,
        }
      : null;
  }
}
