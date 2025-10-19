import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorCreateDriver = async (req: Request, _res: Response, next: NextFunction) => {
  const { email, phone, fullName, licenseData, passportData } = req.body as {
    email?: string;
    phone?: string;
    fullName?: string;
    licenseData?: string;
    passportData?: unknown;
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

  if (validator.isEmpty(licenseData ?? '')) {
    errors.push({ licenseData: 'Дані ліцензії є обовʼязковими.' });
  }

  if (!passportData || typeof passportData !== 'object' || Array.isArray(passportData)) {
    errors.push({ passportData: 'Дані паспорта повинні бути обʼєктом.' });
  }

  if (errors.length > 0) {
    return next(new CustomError(400, 'Validation', 'Помилка валідації створення водія.', null, null, errors));
  }

  return next();
};
