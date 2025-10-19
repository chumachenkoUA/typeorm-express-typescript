import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorUpdatePassenger = async (req: Request, _res: Response, next: NextFunction) => {
  const { email, phone, fullName } = req.body as {
    email?: string | null;
    phone?: string | null;
    fullName?: string | null;
  };

  const errors: ErrorValidation[] = [];

  if (email !== undefined && email !== null && !validator.isEmail(String(email))) {
    errors.push({ email: 'Некоректна адреса електронної пошти.' });
  }

  if (phone !== undefined && validator.isEmpty(phone ?? '')) {
    errors.push({ phone: 'Номер телефону не може бути порожнім.' });
  }

  if (fullName !== undefined && validator.isEmpty(fullName ?? '')) {
    errors.push({ fullName: 'ПІБ не може бути порожнім.' });
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    errors.push({ payload: 'Потрібно вказати хоча б одне поле для оновлення.' });
  }

  if (errors.length > 0) {
    return next(new CustomError(400, 'Validation', 'Помилка валідації оновлення пасажира.', null, null, errors));
  }

  return next();
};
