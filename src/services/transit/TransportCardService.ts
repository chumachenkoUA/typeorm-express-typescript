import { CreateTransportCardDto, UpdateTransportCardDto } from 'dto/transit';
import { TransportCard } from 'orm/entities/transit';

import { ConfiguredCrudService } from './ConfiguredCrudService';

export class TransportCardService extends ConfiguredCrudService<
  TransportCard,
  CreateTransportCardDto,
  UpdateTransportCardDto
> {
  constructor() {
    super({
      entity: TransportCard,
      entityName: 'Transport card',
      relations: ['owner', 'tickets', 'tickets.trip', 'topUps'],
      relationIdMap: {
        owner: 'ownerId',
      },
    });
  }
}
