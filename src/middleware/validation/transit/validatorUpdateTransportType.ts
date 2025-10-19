import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorUpdateTransportType = async (req: Request, _res: Response, next: NextFunction) => {
  const { name } = req.body as {
    name?: string | null;
  };

  const errors: ErrorValidation[] = [];

  if (name !== undefined && validator.isEmpty(name ?? '')) {
    errors.push({ name: 'Назва типу транспорту не може бути порожньою.' });
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    errors.push({ payload: 'Потрібно вказати хоча б одне поле для оновлення.' });
  }

  if (errors.length > 0) {
    return next(new CustomError(400, 'Validation', 'Помилка валідації оновлення типу транспорту.', null, null, errors));
  }

  return next();
};
