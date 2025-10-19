import { CreateTripDto, UpdateTripDto } from 'dto/transit';
import { Trip } from 'orm/entities/transit';

import { ConfiguredCrudService } from './ConfiguredCrudService';

export class TripService extends ConfiguredCrudService<Trip, CreateTripDto, UpdateTripDto> {
  constructor() {
    super({
      entity: Trip,
      entityName: 'Trip',
      relations: [
        'route',
        'route.transportType',
        'transport',
        'transport.transportType',
        'driver',
        'tickets',
        'tickets.card',
        'tickets.card.owner',
        'complaints',
        'complaints.passenger',
        'fines',
        'fines.passenger',
      ],
      relationIdMap: {
        route: 'routeId',
        transport: 'transportId',
        driver: 'driverId',
      },
    });
  }
}
