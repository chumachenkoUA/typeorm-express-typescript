import { TransportCard } from 'orm/entities/transit';

import { mapArray, toIsoString } from './BaseTransitResponseDto';

export class TransportCardResponseDto {
  id: string;
  number: string;
  balance: string;
  owner: {
    id: string;
    fullName: string;
    email: string;
  } | null;
  tickets: { id: string; tripId: string | null; price: string; purchasedAt: string | null }[];
  topUps: { id: string; amount: string; toppedUpAt: string | null }[];

  constructor(entity: TransportCard) {
    this.id = entity.id;
    this.number = entity.number;
    this.balance = entity.balance;
    this.owner = entity.owner
      ? {
          id: entity.owner.id,
          fullName: entity.owner.fullName,
          email: entity.owner.email,
        }
      : null;
    this.tickets = mapArray(entity.tickets, (ticket) => ({
      id: ticket.id,
      tripId: ticket.trip?.id ?? null,
      price: ticket.price,
      purchasedAt: toIsoString(ticket.purchasedAt),
    }));
    this.topUps = mapArray(entity.topUps, (topUp) => ({
      id: topUp.id,
      amount: topUp.amount,
      toppedUpAt: toIsoString(topUp.toppedUpAt),
    }));
  }
}
