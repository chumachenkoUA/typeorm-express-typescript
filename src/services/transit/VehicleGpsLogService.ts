import { CreateVehicleGpsLogDto, UpdateVehicleGpsLogDto } from 'dto/transit';
import { VehicleGpsLog } from 'orm/entities/transit';

import { ConfiguredCrudService } from './ConfiguredCrudService';

export class VehicleGpsLogService extends ConfiguredCrudService<
  VehicleGpsLog,
  CreateVehicleGpsLogDto,
  UpdateVehicleGpsLogDto
> {
  constructor() {
    super({
      entity: VehicleGpsLog,
      entityName: 'Vehicle GPS log',
      relations: ['transport', 'transport.route', 'transport.transportType'],
      relationIdMap: {
        transport: 'transportId',
      },
    });
  }
}
