import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorCreateDriverAssignment = async (req: Request, _res: Response, next: NextFunction) => {
  const { driverId, transportId, assignedAt } = req.body as {
    driverId?: string;
    transportId?: string;
    assignedAt?: string | Date | null;
  };

  const errors: ErrorValidation[] = [];

  if (!driverId || !validator.isUUID(String(driverId))) {
    errors.push({ driverId: 'ID водія має бути валідним UUID.' });
  }

  if (!transportId || !validator.isUUID(String(transportId))) {
    errors.push({ transportId: 'ID транспорту має бути валідним UUID.' });
  }

  if (assignedAt !== undefined && assignedAt !== null && !validator.isISO8601(String(assignedAt))) {
    errors.push({ assignedAt: 'Дата призначення повинна бути у форматі ISO-8601.' });
  }

  if (errors.length > 0) {
    return next(
      new CustomError(400, 'Validation', 'Помилка валідації створення призначення водія.', null, null, errors),
    );
  }

  return next();
};
