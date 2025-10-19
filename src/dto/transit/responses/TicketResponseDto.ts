import { Ticket } from 'orm/entities/transit';

import { toIsoString } from './BaseTransitResponseDto';

export class TicketResponseDto {
  id: string;
  price: string;
  purchasedAt: string | null;
  trip: {
    id: string;
    startedAt: string | null;
    route: {
      id: string;
      number: string;
      direction: string;
    } | null;
  } | null;
  card: {
    id: string;
    number: string;
    owner: {
      id: string;
      fullName: string;
    } | null;
  } | null;

  constructor(entity: Ticket) {
    this.id = entity.id;
    this.price = entity.price;
    this.purchasedAt = toIsoString(entity.purchasedAt);
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
    this.card = entity.card
      ? {
          id: entity.card.id,
          number: entity.card.number,
          owner: entity.card.owner
            ? {
                id: entity.card.owner.id,
                fullName: entity.card.owner.fullName,
              }
            : null,
        }
      : null;
  }
}
