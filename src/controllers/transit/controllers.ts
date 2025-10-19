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
  CardTopUpResponseDto,
  ComplaintSuggestionResponseDto,
  DriverAssignmentResponseDto,
  DriverResponseDto,
  FineAppealResponseDto,
  FineResponseDto,
  PassengerResponseDto,
  RoutePointResponseDto,
  RouteResponseDto,
  RouteStopResponseDto,
  ScheduleResponseDto,
  StopResponseDto,
  TicketResponseDto,
  TransportCardResponseDto,
  TransportResponseDto,
  TransportTypeResponseDto,
  TripResponseDto,
  UserGpsLogResponseDto,
  VehicleGpsLogResponseDto,
} from 'dto/transit/responses';
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
import {
  CardTopUpService,
  ComplaintSuggestionService,
  DriverAssignmentService,
  DriverService,
  FineAppealService,
  FineService,
  PassengerService,
  RoutePointService,
  RouteService,
  RouteStopService,
  ScheduleService,
  StopService,
  TicketService,
  TransportCardService,
  TransportService,
  TransportTypeService,
  TripService,
  UserGpsLogService,
  VehicleGpsLogService,
} from 'services/transit';

import { BaseCrudController } from './BaseCrudController';

const cardTopUpService = new CardTopUpService();
export const cardTopUpController = new BaseCrudController<
  CardTopUp,
  CreateCardTopUpDto,
  UpdateCardTopUpDto,
  CardTopUpResponseDto
>(cardTopUpService, 'Card top-up', (entity) => new CardTopUpResponseDto(entity));

export const complaintSuggestionController = new BaseCrudController<
  ComplaintSuggestion,
  CreateComplaintSuggestionDto,
  UpdateComplaintSuggestionDto,
  ComplaintSuggestionResponseDto
>(new ComplaintSuggestionService(), 'Complaint suggestion', (entity) => new ComplaintSuggestionResponseDto(entity));

export const driverController = new BaseCrudController<Driver, CreateDriverDto, UpdateDriverDto, DriverResponseDto>(
  new DriverService(),
  'Driver',
  (entity) => new DriverResponseDto(entity),
);

export const driverAssignmentController = new BaseCrudController<
  DriverAssignment,
  CreateDriverAssignmentDto,
  UpdateDriverAssignmentDto,
  DriverAssignmentResponseDto
>(new DriverAssignmentService(), 'Driver assignment', (entity) => new DriverAssignmentResponseDto(entity));

export const fineController = new BaseCrudController<Fine, CreateFineDto, UpdateFineDto, FineResponseDto>(
  new FineService(),
  'Fine',
  (entity) => new FineResponseDto(entity),
);

export const fineAppealController = new BaseCrudController<
  FineAppeal,
  CreateFineAppealDto,
  UpdateFineAppealDto,
  FineAppealResponseDto
>(new FineAppealService(), 'Fine appeal', (entity) => new FineAppealResponseDto(entity));

export const passengerController = new BaseCrudController<
  Passenger,
  CreatePassengerDto,
  UpdatePassengerDto,
  PassengerResponseDto
>(new PassengerService(), 'Passenger', (entity) => new PassengerResponseDto(entity));

const routeService = new RouteService();
export const routeController = new BaseCrudController<Route, CreateRouteDto, UpdateRouteDto, RouteResponseDto>(
  routeService,
  'Route',
  (entity) => new RouteResponseDto(entity),
);

export const routePointController = new BaseCrudController<
  RoutePoint,
  CreateRoutePointDto,
  UpdateRoutePointDto,
  RoutePointResponseDto
>(new RoutePointService(), 'Route point', (entity) => new RoutePointResponseDto(entity));

export const routeStopController = new BaseCrudController<
  RouteStop,
  CreateRouteStopDto,
  UpdateRouteStopDto,
  RouteStopResponseDto
>(new RouteStopService(), 'Route stop', (entity) => new RouteStopResponseDto(entity));

export const scheduleController = new BaseCrudController<
  Schedule,
  CreateScheduleDto,
  UpdateScheduleDto,
  ScheduleResponseDto
>(new ScheduleService(), 'Schedule', (entity) => new ScheduleResponseDto(entity));

export const stopController = new BaseCrudController<Stop, CreateStopDto, UpdateStopDto, StopResponseDto>(
  new StopService(),
  'Stop',
  (entity) => new StopResponseDto(entity),
);

export const ticketController = new BaseCrudController<Ticket, CreateTicketDto, UpdateTicketDto, TicketResponseDto>(
  new TicketService(),
  'Ticket',
  (entity) => new TicketResponseDto(entity),
);

export const transportController = new BaseCrudController<
  Transport,
  CreateTransportDto,
  UpdateTransportDto,
  TransportResponseDto
>(new TransportService(), 'Transport', (entity) => new TransportResponseDto(entity));

export const transportCardController = new BaseCrudController<
  TransportCard,
  CreateTransportCardDto,
  UpdateTransportCardDto,
  TransportCardResponseDto
>(new TransportCardService(), 'Transport card', (entity) => new TransportCardResponseDto(entity));

export const transportTypeController = new BaseCrudController<
  TransportType,
  CreateTransportTypeDto,
  UpdateTransportTypeDto,
  TransportTypeResponseDto
>(new TransportTypeService(), 'Transport type', (entity) => new TransportTypeResponseDto(entity));

export const tripController = new BaseCrudController<Trip, CreateTripDto, UpdateTripDto, TripResponseDto>(
  new TripService(),
  'Trip',
  (entity) => new TripResponseDto(entity),
);

export const userGpsLogController = new BaseCrudController<
  UserGpsLog,
  CreateUserGpsLogDto,
  UpdateUserGpsLogDto,
  UserGpsLogResponseDto
>(new UserGpsLogService(), 'User GPS log', (entity) => new UserGpsLogResponseDto(entity));

export const vehicleGpsLogController = new BaseCrudController<
  VehicleGpsLog,
  CreateVehicleGpsLogDto,
  UpdateVehicleGpsLogDto,
  VehicleGpsLogResponseDto
>(new VehicleGpsLogService(), 'Vehicle GPS log', (entity) => new VehicleGpsLogResponseDto(entity));
