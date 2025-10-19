import { CreateFineAppealDto, UpdateFineAppealDto } from 'dto/transit';
import { FineAppeal } from 'orm/entities/transit';

import { ConfiguredCrudService } from './ConfiguredCrudService';

export class FineAppealService extends ConfiguredCrudService<FineAppeal, CreateFineAppealDto, UpdateFineAppealDto> {
  constructor() {
    super({
      entity: FineAppeal,
      entityName: 'Fine appeal',
      relations: ['fine', 'fine.passenger', 'fine.trip'],
      relationIdMap: {
        fine: 'fineId',
      },
    });
  }
}
