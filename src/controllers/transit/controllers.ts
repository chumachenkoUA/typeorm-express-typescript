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
import {
  cardTopUpService,
  complaintSuggestionService,
  driverAssignmentService,
  driverService,
  fineAppealService,
  fineService,
  passengerService,
  routePointService,
  routeService,
  routeStopService,
  scheduleService,
  stopService,
  ticketService,
  transportCardService,
  transportService,
  transportTypeService,
  tripService,
  userGpsLogService,
  vehicleGpsLogService,
} from 'services/transit/services';

import { BaseCrudController } from './BaseCrudController';

export const cardTopUpController = new BaseCrudController<CardTopUp, CreateCardTopUpDto, UpdateCardTopUpDto>(
  cardTopUpService,
  'Card top-up',
);

export const complaintSuggestionController = new BaseCrudController<
  ComplaintSuggestion,
  CreateComplaintSuggestionDto,
  UpdateComplaintSuggestionDto
>(complaintSuggestionService, 'Complaint suggestion');

export const driverController = new BaseCrudController<Driver, CreateDriverDto, UpdateDriverDto>(
  driverService,
  'Driver',
);

export const driverAssignmentController = new BaseCrudController<
  DriverAssignment,
  CreateDriverAssignmentDto,
  UpdateDriverAssignmentDto
>(driverAssignmentService, 'Driver assignment');

export const fineController = new BaseCrudController<Fine, CreateFineDto, UpdateFineDto>(fineService, 'Fine');

export const fineAppealController = new BaseCrudController<FineAppeal, CreateFineAppealDto, UpdateFineAppealDto>(
  fineAppealService,
  'Fine appeal',
);

export const passengerController = new BaseCrudController<Passenger, CreatePassengerDto, UpdatePassengerDto>(
  passengerService,
  'Passenger',
);

export const routeController = new BaseCrudController<Route, CreateRouteDto, UpdateRouteDto>(routeService, 'Route');

export const routePointController = new BaseCrudController<RoutePoint, CreateRoutePointDto, UpdateRoutePointDto>(
  routePointService,
  'Route point',
);

export const routeStopController = new BaseCrudController<RouteStop, CreateRouteStopDto, UpdateRouteStopDto>(
  routeStopService,
  'Route stop',
);

export const scheduleController = new BaseCrudController<Schedule, CreateScheduleDto, UpdateScheduleDto>(
  scheduleService,
  'Schedule',
);

export const stopController = new BaseCrudController<Stop, CreateStopDto, UpdateStopDto>(stopService, 'Stop');

export const ticketController = new BaseCrudController<Ticket, CreateTicketDto, UpdateTicketDto>(
  ticketService,
  'Ticket',
);

export const transportController = new BaseCrudController<Transport, CreateTransportDto, UpdateTransportDto>(
  transportService,
  'Transport',
);

export const transportCardController = new BaseCrudController<
  TransportCard,
  CreateTransportCardDto,
  UpdateTransportCardDto
>(transportCardService, 'Transport card');

export const transportTypeController = new BaseCrudController<
  TransportType,
  CreateTransportTypeDto,
  UpdateTransportTypeDto
>(transportTypeService, 'Transport type');

export const tripController = new BaseCrudController<Trip, CreateTripDto, UpdateTripDto>(tripService, 'Trip');

export const userGpsLogController = new BaseCrudController<UserGpsLog, CreateUserGpsLogDto, UpdateUserGpsLogDto>(
  userGpsLogService,
  'User GPS log',
);

export const vehicleGpsLogController = new BaseCrudController<
  VehicleGpsLog,
  CreateVehicleGpsLogDto,
  UpdateVehicleGpsLogDto
>(vehicleGpsLogService, 'Vehicle GPS log');
