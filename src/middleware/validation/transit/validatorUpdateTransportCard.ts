import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorUpdateTransportCard = async (req: Request, _res: Response, next: NextFunction) => {
  const { ownerId, balance, number } = req.body as {
    ownerId?: string | null;
    balance?: string | number | null;
    number?: string | null;
  };

  const errors: ErrorValidation[] = [];

  if (ownerId !== undefined && ownerId !== null && !validator.isUUID(String(ownerId))) {
    errors.push({ ownerId: 'ID власника має бути валідним UUID.' });
  }

  if (number !== undefined && validator.isEmpty(number ?? '')) {
    errors.push({ number: 'Номер карти не може бути порожнім.' });
  }

  if (balance !== undefined && balance !== null && !validator.isFloat(String(balance), { min: 0 })) {
    errors.push({ balance: 'Баланс повинен бути невідʼємним числом.' });
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    errors.push({ payload: 'Потрібно вказати хоча б одне поле для оновлення.' });
  }

  if (errors.length > 0) {
    return next(
      new CustomError(400, 'Validation', 'Помилка валідації оновлення транспортної карти.', null, null, errors),
    );
  }

  return next();
};
