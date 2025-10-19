import { Fine } from 'orm/entities/transit';

import { toIsoString } from './BaseTransitResponseDto';

export class FineResponseDto {
  id: string;
  status: string;
  issuedAt: string | null;
  passenger: {
    id: string | null;
    fullName: string | null;
    email: string | null;
    phone: string | null;
  };
  trip: {
    id: string;
    startedAt: string | null;
    route: {
      id: string;
      number: string;
    } | null;
  } | null;
  appeal: {
    id: string | null;
    status: string | null;
    message: string | null;
    submittedAt: string | null;
  } | null;

  constructor(entity: Fine) {
    this.id = entity.id;
    this.status = entity.status;
    this.issuedAt = toIsoString(entity.issuedAt);
    this.passenger = {
      id: entity.passenger?.id ?? null,
      fullName: entity.passenger?.fullName ?? null,
      email: entity.passenger?.email ?? null,
      phone: entity.passenger?.phone ?? null,
    };
    this.trip = entity.trip
      ? {
          id: entity.trip.id,
          startedAt: toIsoString(entity.trip.startedAt),
          route: entity.trip.route
            ? {
                id: entity.trip.route.id,
                number: entity.trip.route.number,
              }
            : null,
        }
      : null;
    this.appeal = entity.appeal
      ? {
          id: entity.appeal.id,
          status: entity.appeal.status,
          message: entity.appeal.message,
          submittedAt: toIsoString(entity.appeal.submittedAt),
        }
      : null;
  }
}
