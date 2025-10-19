import { CreateComplaintSuggestionDto, UpdateComplaintSuggestionDto } from 'dto/transit';
import { ComplaintSuggestion } from 'orm/entities/transit';

import { ConfiguredCrudService } from './ConfiguredCrudService';

export class ComplaintSuggestionService extends ConfiguredCrudService<
  ComplaintSuggestion,
  CreateComplaintSuggestionDto,
  UpdateComplaintSuggestionDto
> {
  constructor() {
    super({
      entity: ComplaintSuggestion,
      entityName: 'Complaint suggestion',
      relations: ['passenger', 'trip', 'trip.route', 'trip.transport', 'trip.driver'],
      relationIdMap: {
        passenger: 'passengerId',
        trip: 'tripId',
      },
    });
  }
}
