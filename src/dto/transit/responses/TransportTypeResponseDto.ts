import { TransportType } from 'orm/entities/transit';

import { mapArray } from './BaseTransitResponseDto';

export class TransportTypeResponseDto {
  id: string;
  name: string;
  routes: { id: string; number: string; direction: string }[];
  transports: { id: string; boardNumber: string; capacity: number }[];

  constructor(entity: TransportType) {
    this.id = entity.id;
    this.name = entity.name;
    this.routes = mapArray(entity.routes, (route) => ({
      id: route.id,
      number: route.number,
      direction: route.direction,
    }));
    this.transports = mapArray(entity.transports, (transport) => ({
      id: transport.id,
      boardNumber: transport.boardNumber,
      capacity: transport.capacity,
    }));
  }
}
