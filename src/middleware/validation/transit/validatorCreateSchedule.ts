import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorCreateSchedule = async (req: Request, _res: Response, next: NextFunction) => {
  const { routeId, startTime, endTime, intervalMinutes } = req.body as {
    routeId?: string;
    startTime?: string | Date;
    endTime?: string | Date;
    intervalMinutes?: number | string;
  };

  const errors: ErrorValidation[] = [];

  if (!routeId || !validator.isUUID(String(routeId))) {
    errors.push({ routeId: 'ID маршруту має бути валідним UUID.' });
  }

  if (!startTime || !validator.isISO8601(String(startTime))) {
    errors.push({ startTime: 'Час початку має бути у форматі ISO-8601.' });
  }

  if (!endTime || !validator.isISO8601(String(endTime))) {
    errors.push({ endTime: 'Час завершення має бути у форматі ISO-8601.' });
  }

  if (intervalMinutes === undefined || !validator.isInt(String(intervalMinutes), { min: 1 })) {
    errors.push({ intervalMinutes: 'Інтервал має бути додатнім цілим числом.' });
  }

  if (errors.length > 0) {
    return next(new CustomError(400, 'Validation', 'Помилка валідації створення розкладу.', null, null, errors));
  }

  return next();
};
