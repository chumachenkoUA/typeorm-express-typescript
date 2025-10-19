import {
  CreateCardTopUpDto,
  CreateComplaintSuggestionDto,
  CreateDriverAssignmentDto,
  CreateDriverDto,
  CreateFineAppealDto,
  CreateFineDto,
  CreatePassengerDto,
  CreateRouteDto,
  CreateRoutePointDto,
  CreateRouteStopDto,
  CreateScheduleDto,
  CreateStopDto,
  CreateTicketDto,
  CreateTransportCardDto,
  CreateTransportDto,
  CreateTransportTypeDto,
  CreateTripDto,
  CreateUserGpsLogDto,
  CreateVehicleGpsLogDto,
  UpdateCardTopUpDto,
  UpdateComplaintSuggestionDto,
  UpdateDriverAssignmentDto,
  UpdateDriverDto,
  UpdateFineAppealDto,
  UpdateFineDto,
  UpdatePassengerDto,
  UpdateRouteDto,
  UpdateRoutePointDto,
  UpdateRouteStopDto,
  UpdateScheduleDto,
  UpdateStopDto,
  UpdateTicketDto,
  UpdateTransportCardDto,
  UpdateTransportDto,
  UpdateTransportTypeDto,
  UpdateTripDto,
  UpdateUserGpsLogDto,
  UpdateVehicleGpsLogDto,
} from 'dto/transit';
import {
  CardTopUp,
  ComplaintSuggestion,
  Driver,
  DriverAssignment,
  Fine,
  FineAppeal,
  Passenger,
  Route,
  RoutePoint,
  RouteStop,
  Schedule,
  Stop,
  Ticket,
  Transport,
  TransportCard,
  TransportType,
  Trip,
  UserGpsLog,
  VehicleGpsLog,
} from 'orm/entities/transit';

import { ConfiguredCrudService } from './ConfiguredCrudService';

export const cardTopUpService = new ConfiguredCrudService<CardTopUp, CreateCardTopUpDto, UpdateCardTopUpDto>({
  entity: CardTopUp,
  entityName: 'Card top-up',
  relations: ['card', 'card.owner'],
  relationIdMap: {
    card: 'cardId',
  },
});

export const complaintSuggestionService = new ConfiguredCrudService<
  ComplaintSuggestion,
  CreateComplaintSuggestionDto,
  UpdateComplaintSuggestionDto
>({
  entity: ComplaintSuggestion,
  entityName: 'Complaint suggestion',
  relations: ['passenger', 'trip', 'trip.route', 'trip.transport', 'trip.driver'],
  relationIdMap: {
    passenger: 'passengerId',
    trip: 'tripId',
  },
});

export const driverService = new ConfiguredCrudService<Driver, CreateDriverDto, UpdateDriverDto>({
  entity: Driver,
  entityName: 'Driver',
  relations: [
    'assignments',
    'assignments.transport',
    'assignments.transport.route',
    'trips',
    'trips.route',
    'trips.transport',
  ],
});

export const driverAssignmentService = new ConfiguredCrudService<
  DriverAssignment,
  CreateDriverAssignmentDto,
  UpdateDriverAssignmentDto
>({
  entity: DriverAssignment,
  entityName: 'Driver assignment',
  relations: ['driver', 'transport', 'transport.route', 'transport.transportType'],
  relationIdMap: {
    driver: 'driverId',
    transport: 'transportId',
  },
});

export const fineService = new ConfiguredCrudService<Fine, CreateFineDto, UpdateFineDto>({
  entity: Fine,
  entityName: 'Fine',
  relations: ['passenger', 'trip', 'trip.route', 'trip.transport', 'appeal'],
  relationIdMap: {
    passenger: 'passengerId',
    trip: 'tripId',
  },
});

export const fineAppealService = new ConfiguredCrudService<FineAppeal, CreateFineAppealDto, UpdateFineAppealDto>({
  entity: FineAppeal,
  entityName: 'Fine appeal',
  relations: ['fine', 'fine.passenger', 'fine.trip'],
  relationIdMap: {
    fine: 'fineId',
  },
});

export const passengerService = new ConfiguredCrudService<Passenger, CreatePassengerDto, UpdatePassengerDto>({
  entity: Passenger,
  entityName: 'Passenger',
  relations: [
    'transportCard',
    'transportCard.topUps',
    'transportCard.tickets',
    'complaints',
    'complaints.trip',
    'fines',
    'fines.trip',
    'gpsLogs',
  ],
});

export const routeService = new ConfiguredCrudService<Route, CreateRouteDto, UpdateRouteDto>({
  entity: Route,
  entityName: 'Route',
  relations: [
    'transportType',
    'routeStops',
    'routeStops.stop',
    'routePoints',
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

export const routePointService = new ConfiguredCrudService<RoutePoint, CreateRoutePointDto, UpdateRoutePointDto>({
  entity: RoutePoint,
  entityName: 'Route point',
  relations: ['route', 'previousPoint', 'nextPoint'],
  relationIdMap: {
    route: 'routeId',
    previousPoint: 'previousPointId',
    nextPoint: 'nextPointId',
  },
});

export const routeStopService = new ConfiguredCrudService<RouteStop, CreateRouteStopDto, UpdateRouteStopDto>({
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

export const scheduleService = new ConfiguredCrudService<Schedule, CreateScheduleDto, UpdateScheduleDto>({
  entity: Schedule,
  entityName: 'Schedule',
  relations: ['route', 'route.transportType'],
  relationIdMap: {
    route: 'routeId',
  },
});

export const stopService = new ConfiguredCrudService<Stop, CreateStopDto, UpdateStopDto>({
  entity: Stop,
  entityName: 'Stop',
  relations: ['routeStops', 'routeStops.route'],
});

export const ticketService = new ConfiguredCrudService<Ticket, CreateTicketDto, UpdateTicketDto>({
  entity: Ticket,
  entityName: 'Ticket',
  relations: ['trip', 'trip.route', 'trip.transport', 'trip.driver', 'card', 'card.owner'],
  relationIdMap: {
    trip: 'tripId',
    card: 'cardId',
  },
});

export const transportService = new ConfiguredCrudService<Transport, CreateTransportDto, UpdateTransportDto>({
  entity: Transport,
  entityName: 'Transport',
  relations: [
    'transportType',
    'route',
    'gpsLogs',
    'assignments',
    'assignments.driver',
    'trips',
    'trips.driver',
    'trips.route',
  ],
  relationIdMap: {
    transportType: 'transportTypeId',
    route: 'routeId',
  },
});

export const transportCardService = new ConfiguredCrudService<
  TransportCard,
  CreateTransportCardDto,
  UpdateTransportCardDto
>({
  entity: TransportCard,
  entityName: 'Transport card',
  relations: ['owner', 'tickets', 'tickets.trip', 'topUps'],
  relationIdMap: {
    owner: 'ownerId',
  },
});

export const transportTypeService = new ConfiguredCrudService<
  TransportType,
  CreateTransportTypeDto,
  UpdateTransportTypeDto
>({
  entity: TransportType,
  entityName: 'Transport type',
  relations: ['routes', 'routes.schedule', 'transports'],
});

export const tripService = new ConfiguredCrudService<Trip, CreateTripDto, UpdateTripDto>({
  entity: Trip,
  entityName: 'Trip',
  relations: [
    'route',
    'route.transportType',
    'transport',
    'transport.transportType',
    'driver',
    'tickets',
    'tickets.card',
    'tickets.card.owner',
    'complaints',
    'complaints.passenger',
    'fines',
    'fines.passenger',
  ],
  relationIdMap: {
    route: 'routeId',
    transport: 'transportId',
    driver: 'driverId',
  },
});

export const userGpsLogService = new ConfiguredCrudService<UserGpsLog, CreateUserGpsLogDto, UpdateUserGpsLogDto>({
  entity: UserGpsLog,
  entityName: 'User GPS log',
  relations: ['passenger'],
  relationIdMap: {
    passenger: 'passengerId',
  },
});

export const vehicleGpsLogService = new ConfiguredCrudService<
  VehicleGpsLog,
  CreateVehicleGpsLogDto,
  UpdateVehicleGpsLogDto
>({
  entity: VehicleGpsLog,
  entityName: 'Vehicle GPS log',
  relations: ['transport', 'transport.route', 'transport.transportType'],
  relationIdMap: {
    transport: 'transportId',
  },
});
