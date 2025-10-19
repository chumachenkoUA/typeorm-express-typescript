import { FineAppeal } from 'orm/entities/transit';

import { toIsoString } from './BaseTransitResponseDto';

export class FineAppealResponseDto {
  id: string;
  message: string;
  status: string;
  submittedAt: string | null;
  fine: {
    id: string;
    status: string;
    passenger: {
      id: string | null;
      fullName: string | null;
    };
    tripId: string | null;
  } | null;

  constructor(entity: FineAppeal) {
    this.id = entity.id;
    this.message = entity.message;
    this.status = entity.status;
    this.submittedAt = toIsoString(entity.submittedAt);
    this.fine = entity.fine
      ? {
          id: entity.fine.id,
          status: entity.fine.status,
          passenger: {
            id: entity.fine.passenger?.id ?? null,
            fullName: entity.fine.passenger?.fullName ?? null,
          },
          tripId: entity.fine.trip?.id ?? null,
        }
      : null;
  }
}
