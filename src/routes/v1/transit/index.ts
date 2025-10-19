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

import { buildCrudRouter } from './helpers';

const router = Router();

router.use('/card-top-ups', buildCrudRouter(cardTopUpController));
router.use('/complaint-suggestions', buildCrudRouter(complaintSuggestionController));
router.use('/drivers', buildCrudRouter(driverController));
router.use('/driver-assignments', buildCrudRouter(driverAssignmentController));
router.use('/fines', buildCrudRouter(fineController));
router.use('/fine-appeals', buildCrudRouter(fineAppealController));
router.use('/passengers', buildCrudRouter(passengerController));
router.use('/routes', buildCrudRouter(routeController));
router.use('/route-points', buildCrudRouter(routePointController));
router.use('/route-stops', buildCrudRouter(routeStopController));
router.use('/schedules', buildCrudRouter(scheduleController));
router.use('/stops', buildCrudRouter(stopController));
router.use('/tickets', buildCrudRouter(ticketController));
router.use('/transports', buildCrudRouter(transportController));
router.use('/transport-cards', buildCrudRouter(transportCardController));
router.use('/transport-types', buildCrudRouter(transportTypeController));
router.use('/trips', buildCrudRouter(tripController));
router.use('/user-gps-logs', buildCrudRouter(userGpsLogController));
router.use('/vehicle-gps-logs', buildCrudRouter(vehicleGpsLogController));

export default router;
