import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

import { FineStatus } from 'orm/entities/transit';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorUpdateFine = async (req: Request, _res: Response, next: NextFunction) => {
  const { passengerId, status, tripId, issuedAt } = req.body as {
    passengerId?: string | null;
    status?: FineStatus;
    tripId?: string | null;
    issuedAt?: string | Date | null;
  };

  const errors: ErrorValidation[] = [];

  if (passengerId !== undefined && passengerId !== null && !validator.isUUID(String(passengerId))) {
    errors.push({ passengerId: 'ID пасажира має бути валідним UUID.' });
  }

  if (tripId !== undefined && tripId !== null && !validator.isUUID(String(tripId))) {
    errors.push({ tripId: 'ID поїздки має бути валідним UUID.' });
  }

  if (status !== undefined && !Object.values(FineStatus).includes(status)) {
    errors.push({ status: 'Невірний статус штрафу.' });
  }

  if (issuedAt !== undefined && issuedAt !== null && !validator.isISO8601(String(issuedAt))) {
    errors.push({ issuedAt: 'Дата виписки штрафу повинна бути у форматі ISO-8601.' });
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    errors.push({ payload: 'Потрібно вказати хоча б одне поле для оновлення.' });
  }

  if (errors.length > 0) {
    return next(new CustomError(400, 'Validation', 'Помилка валідації оновлення штрафу.', null, null, errors));
  }

  return next();
};
