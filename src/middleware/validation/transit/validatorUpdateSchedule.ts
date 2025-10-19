import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorUpdateSchedule = async (req: Request, _res: Response, next: NextFunction) => {
  const { routeId, startTime, endTime, intervalMinutes } = req.body as {
    routeId?: string | null;
    startTime?: string | Date | null;
    endTime?: string | Date | null;
    intervalMinutes?: number | string | null;
  };

  const errors: ErrorValidation[] = [];

  if (routeId !== undefined && routeId !== null && !validator.isUUID(String(routeId))) {
    errors.push({ routeId: 'ID маршруту має бути валідним UUID.' });
  }

  if (startTime !== undefined && startTime !== null && !validator.isISO8601(String(startTime))) {
    errors.push({ startTime: 'Час початку має бути у форматі ISO-8601.' });
  }

  if (endTime !== undefined && endTime !== null && !validator.isISO8601(String(endTime))) {
    errors.push({ endTime: 'Час завершення має бути у форматі ISO-8601.' });
  }

  if (
    intervalMinutes !== undefined &&
    intervalMinutes !== null &&
    !validator.isInt(String(intervalMinutes), { min: 1 })
  ) {
    errors.push({ intervalMinutes: 'Інтервал має бути додатнім цілим числом.' });
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    errors.push({ payload: 'Потрібно вказати хоча б одне поле для оновлення.' });
  }

  if (errors.length > 0) {
    return next(new CustomError(400, 'Validation', 'Помилка валідації оновлення розкладу.', null, null, errors));
  }

  return next();
};
