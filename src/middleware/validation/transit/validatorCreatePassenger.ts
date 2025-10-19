import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorCreatePassenger = async (req: Request, _res: Response, next: NextFunction) => {
  const { email, phone, fullName } = req.body as {
    email?: string;
    phone?: string;
    fullName?: string;
  };

  const errors: ErrorValidation[] = [];

  if (!email || !validator.isEmail(String(email))) {
    errors.push({ email: 'Некоректна адреса електронної пошти.' });
  }

  if (validator.isEmpty(phone ?? '')) {
    errors.push({ phone: 'Номер телефону є обовʼязковим.' });
  }

  if (validator.isEmpty(fullName ?? '')) {
    errors.push({ fullName: 'ПІБ є обовʼязковим.' });
  }

  if (errors.length > 0) {
    return next(new CustomError(400, 'Validation', 'Помилка валідації створення пасажира.', null, null, errors));
  }

  return next();
};
