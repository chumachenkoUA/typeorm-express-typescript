import { CreateDriverAssignmentDto, UpdateDriverAssignmentDto } from 'dto/transit';
import { DriverAssignment } from 'orm/entities/transit';

import { ConfiguredCrudService } from './ConfiguredCrudService';

export class DriverAssignmentService extends ConfiguredCrudService<
  DriverAssignment,
  CreateDriverAssignmentDto,
  UpdateDriverAssignmentDto
> {
  constructor() {
    super({
      entity: DriverAssignment,
      entityName: 'Driver assignment',
      relations: ['driver', 'transport', 'transport.route', 'transport.transportType'],
      relationIdMap: {
        driver: 'driverId',
        transport: 'transportId',
      },
    });
  }
}
