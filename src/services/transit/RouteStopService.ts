import { CreateRouteStopDto, UpdateRouteStopDto } from 'dto/transit';
import { RouteStop } from 'orm/entities/transit';

import { ConfiguredCrudService } from './ConfiguredCrudService';

export class RouteStopService extends ConfiguredCrudService<RouteStop, CreateRouteStopDto, UpdateRouteStopDto> {
  constructor() {
    super({
      entity: RouteStop,
      entityName: 'Route stop',
      relations: ['route', 'stop', 'previousStop', 'nextStop'],
      relationIdMap: {
        route: 'routeId',
        stop: 'stopId',
        previousStop: 'previousStopId',
        nextStop: 'nextStopId',
      },
    });
  }
}
