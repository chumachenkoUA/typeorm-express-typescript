import { CreateRouteDto, UpdateRouteDto } from 'dto/transit';
import { Route } from 'orm/entities/transit';

import { ConfiguredCrudService } from './ConfiguredCrudService';

export class RouteService extends ConfiguredCrudService<Route, CreateRouteDto, UpdateRouteDto> {
  constructor() {
    super({
      entity: Route,
      entityName: 'Route',
      relations: [
        'transportType',
        'routeStops',
        'routeStops.stop',
        'routeStops.previousStop',
        'routeStops.nextStop',
        'routePoints',
        'routePoints.previousPoint',
        'routePoints.nextPoint',
        'transports',
        'transports.transportType',
        'schedule',
        'trips',
        'trips.transport',
        'trips.driver',
      ],
      relationIdMap: {
        transportType: 'transportTypeId',
      },
    });
  }
}
