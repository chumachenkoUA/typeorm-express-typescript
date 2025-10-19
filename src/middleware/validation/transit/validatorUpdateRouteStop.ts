import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorUpdateRouteStop = async (req: Request, _res: Response, next: NextFunction) => {
  const { routeId, stopId, previousStopId, nextStopId } = req.body as {
    routeId?: string | null;
    stopId?: string | null;
    previousStopId?: string | null;
    nextStopId?: string | null;
  };

  const errors: ErrorValidation[] = [];

  if (routeId !== undefined && routeId !== null && !validator.isUUID(String(routeId))) {
    errors.push({ routeId: 'ID маршруту має бути валідним UUID.' });
  }

  if (stopId !== undefined && stopId !== null && !validator.isUUID(String(stopId))) {
    errors.push({ stopId: 'ID зупинки має бути валідним UUID.' });
  }

  if (previousStopId !== undefined && previousStopId !== null && !validator.isUUID(String(previousStopId))) {
    errors.push({ previousStopId: 'Попередня зупинка має бути валідним UUID.' });
  }

  if (nextStopId !== undefined && nextStopId !== null && !validator.isUUID(String(nextStopId))) {
    errors.push({ nextStopId: 'Наступна зупинка має бути валідним UUID.' });
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    errors.push({ payload: 'Потрібно вказати хоча б одне поле для оновлення.' });
  }

  if (errors.length > 0) {
    return next(
      new CustomError(400, 'Validation', 'Помилка валідації оновлення зупинки маршруту.', null, null, errors),
    );
  }

  return next();
};
