import { Trip } from 'orm/entities/transit';

import { mapArray, toIsoString } from './BaseTransitResponseDto';

export class TripResponseDto {
  id: string;
  startedAt: string | null;
  finishedAt: string | null;
  passengerCount: number;
  route: {
    id: string | null;
    number: string | null;
    direction: string | null;
  } | null;
  transport: {
    id: string | null;
    boardNumber: string | null;
  } | null;
  driver: {
    id: string | null;
    fullName: string | null;
  } | null;
  tickets: {
    id: string;
    cardId: string | null;
    price: string;
    purchasedAt: string | null;
  }[];
  complaints: {
    id: string;
    type: string;
    status: string;
  }[];
  fines: {
    id: string;
    status: string;
    issuedAt: string | null;
  }[];

  constructor(entity: Trip) {
    this.id = entity.id;
    this.startedAt = toIsoString(entity.startedAt);
    this.finishedAt = toIsoString(entity.finishedAt);
    this.passengerCount = entity.passengerCount;
    this.route = entity.route
      ? {
          id: entity.route.id,
          number: entity.route.number,
          direction: entity.route.direction,
        }
      : null;
    this.transport = entity.transport
      ? {
          id: entity.transport.id,
          boardNumber: entity.transport.boardNumber,
        }
      : null;
    this.driver = entity.driver
      ? {
          id: entity.driver.id,
          fullName: entity.driver.fullName,
        }
      : null;
    this.tickets = mapArray(entity.tickets, (ticket) => ({
      id: ticket.id,
      cardId: ticket.card?.id ?? null,
      price: ticket.price,
      purchasedAt: toIsoString(ticket.purchasedAt),
    }));
    this.complaints = mapArray(entity.complaints, (complaint) => ({
      id: complaint.id,
      type: complaint.type,
      status: complaint.status,
    }));
    this.fines = mapArray(entity.fines, (fine) => ({
      id: fine.id,
      status: fine.status,
      issuedAt: toIsoString(fine.issuedAt),
    }));
  }
}
