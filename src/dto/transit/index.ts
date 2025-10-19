import { ComplaintStatus, FineAppealStatus, FineStatus, RouteDirection } from 'orm/entities/transit';

export type CreateCardTopUpDto = {
  cardId: string;
  amount: string;
  toppedUpAt?: string | Date;
};

export type UpdateCardTopUpDto = Partial<CreateCardTopUpDto>;

export type CreateComplaintSuggestionDto = {
  passengerId: string;
  type: string;
  message: string;
  tripId?: string | null;
  status: ComplaintStatus;
};

export type UpdateComplaintSuggestionDto = Partial<CreateComplaintSuggestionDto>;

export type CreateDriverDto = {
  email: string;
  phone: string;
  fullName: string;
  licenseData: string;
  passportData: Record<string, unknown>;
};

export type UpdateDriverDto = Partial<CreateDriverDto>;

export type CreateDriverAssignmentDto = {
  driverId: string;
  transportId: string;
  assignedAt?: string | Date;
};

export type UpdateDriverAssignmentDto = Partial<CreateDriverAssignmentDto>;

export type CreateFineDto = {
  passengerId: string;
  status: FineStatus;
  tripId: string;
  issuedAt?: string | Date;
};

export type UpdateFineDto = Partial<CreateFineDto>;

export type CreateFineAppealDto = {
  fineId: string;
  message: string;
  status: FineAppealStatus;
  submittedAt?: string | Date;
};

export type UpdateFineAppealDto = Partial<CreateFineAppealDto>;

export type CreatePassengerDto = {
  email: string;
  phone: string;
  fullName: string;
};

export type UpdatePassengerDto = Partial<CreatePassengerDto>;

export type CreateRouteDto = {
  transportTypeId: string;
  number: string;
  direction: RouteDirection;
  isActive?: boolean;
};

export type UpdateRouteDto = Partial<CreateRouteDto>;

export type CreateRoutePointDto = {
  routeId: string;
  longitude: string;
  latitude: string;
  previousPointId?: string | null;
  nextPointId?: string | null;
};

export type UpdateRoutePointDto = Partial<CreateRoutePointDto>;

export type CreateRouteStopDto = {
  routeId: string;
  stopId: string;
  previousStopId?: string | null;
  nextStopId?: string | null;
};

export type UpdateRouteStopDto = Partial<CreateRouteStopDto>;

export type CreateScheduleDto = {
  routeId: string;
  startTime: string;
  endTime: string;
  intervalMinutes: number;
};

export type UpdateScheduleDto = Partial<CreateScheduleDto>;

export type CreateStopDto = {
  name: string;
  longitude: string;
  latitude: string;
};

export type UpdateStopDto = Partial<CreateStopDto>;

export type CreateTicketDto = {
  tripId: string;
  cardId: string;
  price: string;
  purchasedAt?: string | Date;
};

export type UpdateTicketDto = Partial<CreateTicketDto>;

export type CreateTransportDto = {
  boardNumber: string;
  transportTypeId: string;
  capacity: number;
  routeId: string;
};

export type UpdateTransportDto = Partial<CreateTransportDto>;

export type CreateTransportCardDto = {
  ownerId: string;
  balance?: string;
  number: string;
};

export type UpdateTransportCardDto = Partial<CreateTransportCardDto>;

export type CreateTransportTypeDto = {
  name: string;
};

export type UpdateTransportTypeDto = Partial<CreateTransportTypeDto>;

export type CreateTripDto = {
  routeId: string;
  transportId: string;
  driverId: string;
  startedAt: string | Date;
  finishedAt: string | Date;
  passengerCount?: number;
};

export type UpdateTripDto = Partial<CreateTripDto>;

export type CreateUserGpsLogDto = {
  passengerId: string;
  longitude: string;
  latitude: string;
  recordedAt?: string | Date;
};

export type UpdateUserGpsLogDto = Partial<CreateUserGpsLogDto>;

export type CreateVehicleGpsLogDto = {
  transportId: string;
  longitude: string;
  latitude: string;
  recordedAt?: string | Date;
};

export type UpdateVehicleGpsLogDto = Partial<CreateVehicleGpsLogDto>;
