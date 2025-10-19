import { Driver, DriverAssignment, Trip } from 'orm/entities/transit';

import { mapArray, toIsoString } from './BaseTransitResponseDto';
import { DriverAssignmentResponseDto } from './DriverAssignmentResponseDto';

export class DriverResponseDto {
  id: string;
  email: string;
  phone: string;
  fullName: string;
  licenseData: string;
  assignments: DriverAssignmentResponseDto[];
  trips: {
    id: string;
    startedAt: string | null;
    finishedAt: string | null;
    route: {
      id: string;
      number: string;
    } | null;
    transport: {
      id: string;
      boardNumber: string;
    } | null;
  }[];

  constructor(entity: Driver) {
    this.id = entity.id;
    this.email = entity.email;
    this.phone = entity.phone;
    this.fullName = entity.fullName;
    this.licenseData = entity.licenseData;
    this.assignments = mapArray(entity.assignments, (assignment) => new DriverAssignmentResponseDto(assignment));
    this.trips = mapArray(entity.trips, (trip: Trip) => ({
      id: trip.id,
      startedAt: toIsoString(trip.startedAt),
      finishedAt: toIsoString(trip.finishedAt),
      route: trip.route
        ? {
            id: trip.route.id,
            number: trip.route.number,
          }
        : null,
      transport: trip.transport
        ? {
            id: trip.transport.id,
            boardNumber: trip.transport.boardNumber,
          }
        : null,
    }));
  }
}
