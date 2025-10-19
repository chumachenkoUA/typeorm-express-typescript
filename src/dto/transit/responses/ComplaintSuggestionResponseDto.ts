import { ComplaintSuggestion } from 'orm/entities/transit';

import { toIsoString } from './BaseTransitResponseDto';

export class ComplaintSuggestionResponseDto {
  id: string;
  type: string;
  message: string;
  status: string;
  passenger: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
  } | null;
  trip: {
    id: string;
    startedAt: string | null;
    route: {
      id: string;
      number: string;
      direction: string;
    } | null;
  } | null;

  constructor(entity: ComplaintSuggestion) {
    this.id = entity.id;
    this.type = entity.type;
    this.message = entity.message;
    this.status = entity.status;
    this.passenger = entity.passenger
      ? {
          id: entity.passenger.id,
          fullName: entity.passenger.fullName,
          email: entity.passenger.email,
          phone: entity.passenger.phone,
        }
      : null;
    this.trip = entity.trip
      ? {
          id: entity.trip.id,
          startedAt: toIsoString(entity.trip.startedAt),
          route: entity.trip.route
            ? {
                id: entity.trip.route.id,
                number: entity.trip.route.number,
                direction: entity.trip.route.direction,
              }
            : null,
        }
      : null;
  }
}
