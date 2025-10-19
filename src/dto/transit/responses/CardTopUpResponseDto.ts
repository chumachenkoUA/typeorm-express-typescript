import { CardTopUp } from 'orm/entities/transit';

import { toIsoString } from './BaseTransitResponseDto';

export class CardTopUpResponseDto {
  id: string;
  amount: string;
  toppedUpAt: string | null;
  card: {
    id: string;
    number: string;
    balance: string;
    owner: {
      id: string;
      fullName: string;
      email: string;
    } | null;
  } | null;

  constructor(entity: CardTopUp) {
    this.id = entity.id;
    this.amount = entity.amount;
    this.toppedUpAt = toIsoString(entity.toppedUpAt);
    this.card = entity.card
      ? {
          id: entity.card.id,
          number: entity.card.number,
          balance: entity.card.balance,
          owner: entity.card.owner
            ? {
                id: entity.card.owner.id,
                fullName: entity.card.owner.fullName,
                email: entity.card.owner.email,
              }
            : null,
        }
      : null;
  }
}
