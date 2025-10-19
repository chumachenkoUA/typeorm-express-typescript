import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorCreateTransportType = async (req: Request, _res: Response, next: NextFunction) => {
  const { name } = req.body as {
    name?: string;
  };

  const errors: ErrorValidation[] = [];

  if (validator.isEmpty(name ?? '')) {
    errors.push({ name: 'Назва типу транспорту є обовʼязковою.' });
  }

  if (errors.length > 0) {
    return next(new CustomError(400, 'Validation', 'Помилка валідації створення типу транспорту.', null, null, errors));
  }

  return next();
};
