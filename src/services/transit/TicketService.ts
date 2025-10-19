import { CreateTicketDto, UpdateTicketDto } from 'dto/transit';
import { Ticket } from 'orm/entities/transit';

import { ConfiguredCrudService } from './ConfiguredCrudService';

export class TicketService extends ConfiguredCrudService<Ticket, CreateTicketDto, UpdateTicketDto> {
  constructor() {
    super({
      entity: Ticket,
      entityName: 'Ticket',
      relations: ['trip', 'trip.route', 'trip.transport', 'trip.driver', 'card', 'card.owner'],
      relationIdMap: {
        trip: 'tripId',
        card: 'cardId',
      },
    });
  }
}
