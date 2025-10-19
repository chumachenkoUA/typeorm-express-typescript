import { Transport } from 'orm/entities/transit';

import { mapArray, toIsoString } from './BaseTransitResponseDto';
import { DriverAssignmentResponseDto } from './DriverAssignmentResponseDto';

export class TransportResponseDto {
  id: string;
  boardNumber: string;
  capacity: number;
  transportType: {
    id: string;
    name: string;
  } | null;
  route: {
    id: string;
    number: string | null;
    direction: string | null;
  } | null;
  assignments: DriverAssignmentResponseDto[];
  trips: {
    id: string;
    startedAt: string | null;
    finishedAt: string | null;
    routeId: string | null;
  }[];
  gpsLogs: {
    id: string;
    longitude: string;
    latitude: string;
    recordedAt: string | null;
  }[];

  constructor(entity: Transport) {
    this.id = entity.id;
    this.boardNumber = entity.boardNumber;
    this.capacity = entity.capacity;
    this.transportType = entity.transportType
      ? {
          id: entity.transportType.id,
          name: entity.transportType.name,
        }
      : null;
    this.route = entity.route
      ? {
          id: entity.route.id,
          number: entity.route.number ?? null,
          direction: entity.route.direction ?? null,
        }
      : null;
    this.assignments = mapArray(entity.assignments, (assignment) => new DriverAssignmentResponseDto(assignment));
    this.trips = mapArray(entity.trips, (trip) => ({
      id: trip.id,
      startedAt: toIsoString(trip.startedAt),
      finishedAt: toIsoString(trip.finishedAt),
      routeId: trip.route?.id ?? null,
    }));
    this.gpsLogs = mapArray(entity.gpsLogs, (log) => ({
      id: log.id,
      longitude: log.longitude,
      latitude: log.latitude,
      recordedAt: toIsoString(log.recordedAt),
    }));
  }
}
