import { CreateCardTopUpDto, UpdateCardTopUpDto } from 'dto/transit';
import { CardTopUp } from 'orm/entities/transit';

import { ConfiguredCrudService } from './ConfiguredCrudService';

export class CardTopUpService extends ConfiguredCrudService<CardTopUp, CreateCardTopUpDto, UpdateCardTopUpDto> {
  constructor() {
    super({
      entity: CardTopUp,
      entityName: 'Card top-up',
      relations: ['card', 'card.owner'],
      relationIdMap: {
        card: 'cardId',
      },
    });
  }
}
