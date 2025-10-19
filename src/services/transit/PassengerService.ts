import { CreatePassengerDto, UpdatePassengerDto } from 'dto/transit';
import { Passenger } from 'orm/entities/transit';

import { ConfiguredCrudService } from './ConfiguredCrudService';

export class PassengerService extends ConfiguredCrudService<Passenger, CreatePassengerDto, UpdatePassengerDto> {
  constructor() {
    super({
      entity: Passenger,
      entityName: 'Passenger',
      relations: [
        'transportCard',
        'transportCard.topUps',
        'transportCard.tickets',
        'complaints',
        'complaints.trip',
        'fines',
        'fines.trip',
        'gpsLogs',
      ],
    });
  }
}
