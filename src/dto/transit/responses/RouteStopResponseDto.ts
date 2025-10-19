import { RouteStop, Stop } from 'orm/entities/transit';

const mapStop = (stop?: Stop | null) => {
  if (!stop) {
    return null;
  }

  return {
    id: stop.id,
    name: stop.name,
    latitude: stop.latitude,
    longitude: stop.longitude,
  };
};

export class RouteStopResponseDto {
  id: string;
  routeId: string | null;
  stop: ReturnType<typeof mapStop>;
  previousStopId: string | null;
  nextStopId: string | null;
  previousStop: {
    id: string;
    stop: ReturnType<typeof mapStop>;
  } | null;
  nextStop: {
    id: string;
    stop: ReturnType<typeof mapStop>;
  } | null;

  constructor(entity: RouteStop) {
    this.id = entity.id;
    this.routeId = entity.route?.id ?? null;
    this.stop = mapStop(entity.stop);
    this.previousStopId = entity.previousStop?.id ?? null;
    this.nextStopId = entity.nextStop?.id ?? null;
    this.previousStop = entity.previousStop
      ? {
          id: entity.previousStop.id,
          stop: mapStop(entity.previousStop.stop),
        }
      : null;
    this.nextStop = entity.nextStop
      ? {
          id: entity.nextStop.id,
          stop: mapStop(entity.nextStop.stop),
        }
      : null;
  }
}
