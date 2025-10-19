import { CreateStopDto, UpdateStopDto } from 'dto/transit';
import { Stop } from 'orm/entities/transit';

import { ConfiguredCrudService } from './ConfiguredCrudService';

export class StopService extends ConfiguredCrudService<Stop, CreateStopDto, UpdateStopDto> {
  constructor() {
    super({
      entity: Stop,
      entityName: 'Stop',
      relations: ['routeStops', 'routeStops.route'],
    });
  }
}
