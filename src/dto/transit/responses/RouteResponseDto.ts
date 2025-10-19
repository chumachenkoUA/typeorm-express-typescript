import { Route } from 'orm/entities/transit';

import { mapArray, toIsoString } from './BaseTransitResponseDto';
import { RoutePointResponseDto } from './RoutePointResponseDto';
import { RouteStopResponseDto } from './RouteStopResponseDto';

export class RouteResponseDto {
  id: string;
  number: string;
  direction: string;
  isActive: boolean;
  transportType: {
    id: string;
    name: string;
  } | null;
  schedule: {
    id: string;
    startTime: string | null;
    endTime: string | null;
    intervalMinutes: number;
  } | null;
  routeStops: RouteStopResponseDto[];
  routePoints: RoutePointResponseDto[];
  transports: {
    id: string;
    boardNumber: string;
    capacity: number;
  }[];
  trips: {
    id: string;
    startedAt: string | null;
    finishedAt: string | null;
    driver: {
      id: string;
      fullName: string;
    } | null;
  }[];

  constructor(entity: Route) {
    this.id = entity.id;
    this.number = entity.number;
    this.direction = entity.direction;
    this.isActive = entity.isActive;
    this.transportType = entity.transportType
      ? {
          id: entity.transportType.id,
          name: entity.transportType.name,
        }
      : null;
    this.schedule = entity.schedule
      ? {
          id: entity.schedule.id,
          startTime: entity.schedule.startTime,
          endTime: entity.schedule.endTime,
          intervalMinutes: entity.schedule.intervalMinutes,
        }
      : null;
    this.routeStops = mapArray(entity.routeStops, (routeStop) => new RouteStopResponseDto(routeStop));
    this.routePoints = mapArray(entity.routePoints, (routePoint) => new RoutePointResponseDto(routePoint));
    this.transports = mapArray(entity.transports, (transport) => ({
      id: transport.id,
      boardNumber: transport.boardNumber,
      capacity: transport.capacity,
    }));
    this.trips = mapArray(entity.trips, (trip) => ({
      id: trip.id,
      startedAt: toIsoString(trip.startedAt),
      finishedAt: toIsoString(trip.finishedAt),
      driver: trip.driver
        ? {
            id: trip.driver.id,
            fullName: trip.driver.fullName,
          }
        : null,
    }));
  }
}
