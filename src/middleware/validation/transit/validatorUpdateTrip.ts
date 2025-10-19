import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorUpdateTrip = async (req: Request, _res: Response, next: NextFunction) => {
  const { routeId, transportId, driverId, startedAt, finishedAt, passengerCount } = req.body as {
    routeId?: string | null;
    transportId?: string | null;
    driverId?: string | null;
    startedAt?: string | Date | null;
    finishedAt?: string | Date | null;
    passengerCount?: number | string | null;
  };

  const errors: ErrorValidation[] = [];

  if (routeId !== undefined && routeId !== null && !validator.isUUID(String(routeId))) {
    errors.push({ routeId: 'ID маршруту має бути валідним UUID.' });
  }

  if (transportId !== undefined && transportId !== null && !validator.isUUID(String(transportId))) {
    errors.push({ transportId: 'ID транспорту має бути валідним UUID.' });
  }

  if (driverId !== undefined && driverId !== null && !validator.isUUID(String(driverId))) {
    errors.push({ driverId: 'ID водія має бути валідним UUID.' });
  }

  if (startedAt !== undefined && startedAt !== null && !validator.isISO8601(String(startedAt))) {
    errors.push({ startedAt: 'Час початку поїздки має бути у форматі ISO-8601.' });
  }

  if (finishedAt !== undefined && finishedAt !== null && !validator.isISO8601(String(finishedAt))) {
    errors.push({ finishedAt: 'Час завершення поїздки має бути у форматі ISO-8601.' });
  }

  if (passengerCount !== undefined && passengerCount !== null && !validator.isInt(String(passengerCount), { min: 0 })) {
    errors.push({ passengerCount: 'Кількість пасажирів повинна бути невідʼємним цілим числом.' });
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    errors.push({ payload: 'Потрібно вказати хоча б одне поле для оновлення.' });
  }

  if (errors.length > 0) {
    return next(new CustomError(400, 'Validation', 'Помилка валідації оновлення поїздки.', null, null, errors));
  }

  return next();
};
