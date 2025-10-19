import { CreateScheduleDto, UpdateScheduleDto } from 'dto/transit';
import { Schedule } from 'orm/entities/transit';

import { ConfiguredCrudService } from './ConfiguredCrudService';

export class ScheduleService extends ConfiguredCrudService<Schedule, CreateScheduleDto, UpdateScheduleDto> {
  constructor() {
    super({
      entity: Schedule,
      entityName: 'Schedule',
      relations: ['route', 'route.transportType'],
      relationIdMap: {
        route: 'routeId',
      },
    });
  }
}
