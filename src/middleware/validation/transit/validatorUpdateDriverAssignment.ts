import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorUpdateDriverAssignment = async (req: Request, _res: Response, next: NextFunction) => {
  const { driverId, transportId, assignedAt } = req.body as {
    driverId?: string | null;
    transportId?: string | null;
    assignedAt?: string | Date | null;
  };

  const errors: ErrorValidation[] = [];

  if (driverId !== undefined && driverId !== null && !validator.isUUID(String(driverId))) {
    errors.push({ driverId: 'ID водія має бути валідним UUID.' });
  }

  if (transportId !== undefined && transportId !== null && !validator.isUUID(String(transportId))) {
    errors.push({ transportId: 'ID транспорту має бути валідним UUID.' });
  }

  if (assignedAt !== undefined && assignedAt !== null && !validator.isISO8601(String(assignedAt))) {
    errors.push({ assignedAt: 'Дата призначення повинна бути у форматі ISO-8601.' });
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    errors.push({ payload: 'Потрібно вказати хоча б одне поле для оновлення.' });
  }

  if (errors.length > 0) {
    return next(
      new CustomError(400, 'Validation', 'Помилка валідації оновлення призначення водія.', null, null, errors),
    );
  }

  return next();
};
