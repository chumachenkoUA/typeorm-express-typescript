import { CreateDriverDto, UpdateDriverDto } from 'dto/transit';
import { Driver } from 'orm/entities/transit';

import { ConfiguredCrudService } from './ConfiguredCrudService';

export class DriverService extends ConfiguredCrudService<Driver, CreateDriverDto, UpdateDriverDto> {
  constructor() {
    super({
      entity: Driver,
      entityName: 'Driver',
      relations: [
        'assignments',
        'assignments.transport',
        'assignments.transport.route',
        'trips',
        'trips.route',
        'trips.transport',
      ],
    });
  }
}
