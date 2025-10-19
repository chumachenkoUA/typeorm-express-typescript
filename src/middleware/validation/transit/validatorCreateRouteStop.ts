import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorCreateRouteStop = async (req: Request, _res: Response, next: NextFunction) => {
  const { routeId, stopId, previousStopId, nextStopId } = req.body as {
    routeId?: string;
    stopId?: string;
    previousStopId?: string | null;
    nextStopId?: string | null;
  };

  const errors: ErrorValidation[] = [];

  if (!routeId || !validator.isUUID(String(routeId))) {
    errors.push({ routeId: 'ID маршруту має бути валідним UUID.' });
  }

  if (!stopId || !validator.isUUID(String(stopId))) {
    errors.push({ stopId: 'ID зупинки має бути валідним UUID.' });
  }

  if (previousStopId !== undefined && previousStopId !== null && !validator.isUUID(String(previousStopId))) {
    errors.push({ previousStopId: 'Попередня зупинка має бути валідним UUID.' });
  }

  if (nextStopId !== undefined && nextStopId !== null && !validator.isUUID(String(nextStopId))) {
    errors.push({ nextStopId: 'Наступна зупинка має бути валідним UUID.' });
  }

  if (errors.length > 0) {
    return next(
      new CustomError(400, 'Validation', 'Помилка валідації створення зупинки маршруту.', null, null, errors),
    );
  }

  return next();
};
