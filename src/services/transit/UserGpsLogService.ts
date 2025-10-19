import { CreateUserGpsLogDto, UpdateUserGpsLogDto } from 'dto/transit';
import { UserGpsLog } from 'orm/entities/transit';

import { ConfiguredCrudService } from './ConfiguredCrudService';

export class UserGpsLogService extends ConfiguredCrudService<UserGpsLog, CreateUserGpsLogDto, UpdateUserGpsLogDto> {
  constructor() {
    super({
      entity: UserGpsLog,
      entityName: 'User GPS log',
      relations: ['passenger'],
      relationIdMap: {
        passenger: 'passengerId',
      },
    });
  }
}
