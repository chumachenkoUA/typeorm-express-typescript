import { DriverAssignment } from 'orm/entities/transit';

import { toIsoString } from './BaseTransitResponseDto';

export class DriverAssignmentResponseDto {
  id: string;
  driver: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
  } | null;
  transport: {
    id: string;
    boardNumber: string;
    capacity: number;
    route: {
      id: string;
      number: string;
    } | null;
  } | null;
  assignedAt: string | null;

  constructor(entity: DriverAssignment) {
    this.id = entity.id;
    this.driver = entity.driver
      ? {
          id: entity.driver.id,
          fullName: entity.driver.fullName,
          email: entity.driver.email,
          phone: entity.driver.phone,
        }
      : null;
    this.transport = entity.transport
      ? {
          id: entity.transport.id,
          boardNumber: entity.transport.boardNumber,
          capacity: entity.transport.capacity,
          route: entity.transport.route
            ? {
                id: entity.transport.route.id,
                number: entity.transport.route.number,
              }
            : null,
        }
      : null;
    this.assignedAt = toIsoString(entity.assignedAt);
  }
}
