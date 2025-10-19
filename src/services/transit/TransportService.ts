import { CreateTransportDto, UpdateTransportDto } from 'dto/transit';
import { Transport } from 'orm/entities/transit';

import { ConfiguredCrudService } from './ConfiguredCrudService';

export class TransportService extends ConfiguredCrudService<Transport, CreateTransportDto, UpdateTransportDto> {
  constructor() {
    super({
      entity: Transport,
      entityName: 'Transport',
      relations: [
        'transportType',
        'route',
        'gpsLogs',
        'assignments',
        'assignments.driver',
        'trips',
        'trips.driver',
        'trips.route',
      ],
      relationIdMap: {
        transportType: 'transportTypeId',
        route: 'routeId',
      },
    });
  }
}
