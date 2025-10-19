import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorCreateTrip = async (req: Request, _res: Response, next: NextFunction) => {
  const { routeId, transportId, driverId, startedAt, finishedAt, passengerCount } = req.body as {
    routeId?: string;
    transportId?: string;
    driverId?: string;
    startedAt?: string | Date;
    finishedAt?: string | Date;
    passengerCount?: number | string;
  };

  const errors: ErrorValidation[] = [];

  if (!routeId || !validator.isUUID(String(routeId))) {
    errors.push({ routeId: 'ID маршруту має бути валідним UUID.' });
  }

  if (!transportId || !validator.isUUID(String(transportId))) {
    errors.push({ transportId: 'ID транспорту має бути валідним UUID.' });
  }

  if (!driverId || !validator.isUUID(String(driverId))) {
    errors.push({ driverId: 'ID водія має бути валідним UUID.' });
  }

  if (!startedAt || !validator.isISO8601(String(startedAt))) {
    errors.push({ startedAt: 'Час початку поїздки має бути у форматі ISO-8601.' });
  }

  if (!finishedAt || !validator.isISO8601(String(finishedAt))) {
    errors.push({ finishedAt: 'Час завершення поїздки має бути у форматі ISO-8601.' });
  }

  if (passengerCount !== undefined && passengerCount !== null && !validator.isInt(String(passengerCount), { min: 0 })) {
    errors.push({ passengerCount: 'Кількість пасажирів повинна бути невідʼємним цілим числом.' });
  }

  if (errors.length > 0) {
    return next(new CustomError(400, 'Validation', 'Помилка валідації створення поїздки.', null, null, errors));
  }

  return next();
};
