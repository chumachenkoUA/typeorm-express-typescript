import { Router } from 'express';

import {
  cardTopUpController,
  complaintSuggestionController,
  driverAssignmentController,
  driverController,
  fineAppealController,
  fineController,
  passengerController,
  routeController,
  routePointController,
  routeStopController,
  scheduleController,
  stopController,
  ticketController,
  transportCardController,
  transportController,
  transportTypeController,
  tripController,
  userGpsLogController,
  vehicleGpsLogController,
} from 'controllers/transit';
import {
  validatorCreateCardTopUp,
  validatorCreateComplaintSuggestion,
  validatorCreateDriver,
  validatorCreateDriverAssignment,
  validatorCreateFine,
  validatorCreateFineAppeal,
  validatorCreatePassenger,
  validatorCreateRoute,
  validatorCreateRoutePoint,
  validatorCreateRouteStop,
  validatorCreateSchedule,
  validatorCreateStop,
  validatorCreateTicket,
  validatorCreateTransport,
  validatorCreateTransportCard,
  validatorCreateTransportType,
  validatorCreateTrip,
  validatorCreateUserGpsLog,
  validatorCreateVehicleGpsLog,
  validatorUpdateCardTopUp,
  validatorUpdateComplaintSuggestion,
  validatorUpdateDriver,
  validatorUpdateDriverAssignment,
  validatorUpdateFine,
  validatorUpdateFineAppeal,
  validatorUpdatePassenger,
  validatorUpdateRoute,
  validatorUpdateRoutePoint,
  validatorUpdateRouteStop,
  validatorUpdateSchedule,
  validatorUpdateStop,
  validatorUpdateTicket,
  validatorUpdateTransport,
  validatorUpdateTransportCard,
  validatorUpdateTransportType,
  validatorUpdateTrip,
  validatorUpdateUserGpsLog,
  validatorUpdateVehicleGpsLog,
} from 'middleware/validation/transit';

import { buildCrudRouter } from './helpers';

const router = Router();

const transitCrudRoutes = [
  {
    path: '/card-top-ups',
    controller: cardTopUpController,
    middlewares: {
      create: [validatorCreateCardTopUp],
      update: [validatorUpdateCardTopUp],
    },
  },
  {
    path: '/complaint-suggestions',
    controller: complaintSuggestionController,
    middlewares: {
      create: [validatorCreateComplaintSuggestion],
      update: [validatorUpdateComplaintSuggestion],
    },
  },
  {
    path: '/drivers',
    controller: driverController,
    middlewares: {
      create: [validatorCreateDriver],
      update: [validatorUpdateDriver],
    },
  },
  {
    path: '/driver-assignments',
    controller: driverAssignmentController,
    middlewares: {
      create: [validatorCreateDriverAssignment],
      update: [validatorUpdateDriverAssignment],
    },
  },
  {
    path: '/fines',
    controller: fineController,
    middlewares: {
      create: [validatorCreateFine],
      update: [validatorUpdateFine],
    },
  },
  {
    path: '/fine-appeals',
    controller: fineAppealController,
    middlewares: {
      create: [validatorCreateFineAppeal],
      update: [validatorUpdateFineAppeal],
    },
  },
  {
    path: '/passengers',
    controller: passengerController,
    middlewares: {
      create: [validatorCreatePassenger],
      update: [validatorUpdatePassenger],
    },
  },
  {
    path: '/routes',
    controller: routeController,
    middlewares: {
      create: [validatorCreateRoute],
      update: [validatorUpdateRoute],
    },
  },
  {
    path: '/route-points',
    controller: routePointController,
    middlewares: {
      create: [validatorCreateRoutePoint],
      update: [validatorUpdateRoutePoint],
    },
  },
  {
    path: '/route-stops',
    controller: routeStopController,
    middlewares: {
      create: [validatorCreateRouteStop],
      update: [validatorUpdateRouteStop],
    },
  },
  {
    path: '/schedules',
    controller: scheduleController,
    middlewares: {
      create: [validatorCreateSchedule],
      update: [validatorUpdateSchedule],
    },
  },
  {
    path: '/stops',
    controller: stopController,
    middlewares: {
      create: [validatorCreateStop],
      update: [validatorUpdateStop],
    },
  },
  {
    path: '/tickets',
    controller: ticketController,
    middlewares: {
      create: [validatorCreateTicket],
      update: [validatorUpdateTicket],
    },
  },
  {
    path: '/transports',
    controller: transportController,
    middlewares: {
      create: [validatorCreateTransport],
      update: [validatorUpdateTransport],
    },
  },
  {
    path: '/transport-cards',
    controller: transportCardController,
    middlewares: {
      create: [validatorCreateTransportCard],
      update: [validatorUpdateTransportCard],
    },
  },
  {
    path: '/transport-types',
    controller: transportTypeController,
    middlewares: {
      create: [validatorCreateTransportType],
      update: [validatorUpdateTransportType],
    },
  },
  {
    path: '/trips',
    controller: tripController,
    middlewares: {
      create: [validatorCreateTrip],
      update: [validatorUpdateTrip],
    },
  },
  {
    path: '/user-gps-logs',
    controller: userGpsLogController,
    middlewares: {
      create: [validatorCreateUserGpsLog],
      update: [validatorUpdateUserGpsLog],
    },
  },
  {
    path: '/vehicle-gps-logs',
    controller: vehicleGpsLogController,
    middlewares: {
      create: [validatorCreateVehicleGpsLog],
      update: [validatorUpdateVehicleGpsLog],
    },
  },
];

transitCrudRoutes.forEach(({ path, controller, middlewares }) => {
  router.use(path, buildCrudRouter(controller, { middlewares }));
});

export default router;
