import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

import { FineStatus } from 'orm/entities/transit';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorCreateFine = async (req: Request, _res: Response, next: NextFunction) => {
  const { passengerId, status, tripId, issuedAt } = req.body as {
    passengerId?: string;
    status?: FineStatus;
    tripId?: string;
    issuedAt?: string | Date | null;
  };

  const errors: ErrorValidation[] = [];

  if (!passengerId || !validator.isUUID(String(passengerId))) {
    errors.push({ passengerId: 'ID пасажира має бути валідним UUID.' });
  }

  if (!tripId || !validator.isUUID(String(tripId))) {
    errors.push({ tripId: 'ID поїздки має бути валідним UUID.' });
  }

  if (!status || !Object.values(FineStatus).includes(status)) {
    errors.push({ status: 'Невірний статус штрафу.' });
  }

  if (issuedAt !== undefined && issuedAt !== null && !validator.isISO8601(String(issuedAt))) {
    errors.push({ issuedAt: 'Дата виписки штрафу повинна бути у форматі ISO-8601.' });
  }

  if (errors.length > 0) {
    return next(new CustomError(400, 'Validation', 'Помилка валідації створення штрафу.', null, null, errors));
  }

  return next();
};
