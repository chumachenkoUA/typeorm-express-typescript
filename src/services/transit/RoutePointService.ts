import { CreateRoutePointDto, UpdateRoutePointDto } from 'dto/transit';
import { RoutePoint } from 'orm/entities/transit';

import { ConfiguredCrudService } from './ConfiguredCrudService';

export class RoutePointService extends ConfiguredCrudService<RoutePoint, CreateRoutePointDto, UpdateRoutePointDto> {
  constructor() {
    super({
      entity: RoutePoint,
      entityName: 'Route point',
      relations: ['route', 'previousPoint', 'nextPoint'],
      relationIdMap: {
        route: 'routeId',
        previousPoint: 'previousPointId',
        nextPoint: 'nextPointId',
      },
    });
  }
}
