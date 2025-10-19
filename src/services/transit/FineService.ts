import { CreateFineDto, UpdateFineDto } from 'dto/transit';
import { Fine } from 'orm/entities/transit';

import { ConfiguredCrudService } from './ConfiguredCrudService';

export class FineService extends ConfiguredCrudService<Fine, CreateFineDto, UpdateFineDto> {
  constructor() {
    super({
      entity: Fine,
      entityName: 'Fine',
      relations: ['passenger', 'trip', 'trip.route', 'trip.transport', 'appeal'],
      relationIdMap: {
        passenger: 'passengerId',
        trip: 'tripId',
      },
    });
  }
}
