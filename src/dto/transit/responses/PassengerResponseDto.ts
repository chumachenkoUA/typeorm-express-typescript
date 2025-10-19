import { Passenger } from 'orm/entities/transit';

import { mapArray, toIsoString } from './BaseTransitResponseDto';

export class PassengerResponseDto {
  id: string;
  email: string;
  phone: string;
  fullName: string;
  registeredAt: string | null;
  transportCard: {
    id: string;
    number: string;
    balance: string;
  } | null;
  fines: { id: string; status: string; issuedAt: string | null }[];
  complaints: { id: string; type: string; status: string }[];

  constructor(entity: Passenger) {
    this.id = entity.id;
    this.email = entity.email;
    this.phone = entity.phone;
    this.fullName = entity.fullName;
    this.registeredAt = toIsoString(entity.registeredAt);
    this.transportCard = entity.transportCard
      ? {
          id: entity.transportCard.id,
          number: entity.transportCard.number,
          balance: entity.transportCard.balance,
        }
      : null;
    this.fines = mapArray(entity.fines, (fine) => ({
      id: fine.id,
      status: fine.status,
      issuedAt: toIsoString(fine.issuedAt),
    }));
    this.complaints = mapArray(entity.complaints, (complaint) => ({
      id: complaint.id,
      type: complaint.type,
      status: complaint.status,
    }));
  }
}
