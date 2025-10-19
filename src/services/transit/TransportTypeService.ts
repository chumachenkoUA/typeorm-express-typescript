import { CreateTransportTypeDto, UpdateTransportTypeDto } from 'dto/transit';
import { TransportType } from 'orm/entities/transit';

import { ConfiguredCrudService } from './ConfiguredCrudService';

export class TransportTypeService extends ConfiguredCrudService<
  TransportType,
  CreateTransportTypeDto,
  UpdateTransportTypeDto
> {
  constructor() {
    super({
      entity: TransportType,
      entityName: 'Transport type',
      relations: ['routes', 'routes.schedule', 'transports'],
    });
  }
}
