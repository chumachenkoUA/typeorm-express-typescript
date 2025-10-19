import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorCreateTransportCard = async (req: Request, _res: Response, next: NextFunction) => {
  const { ownerId, balance, number } = req.body as {
    ownerId?: string;
    balance?: string | number;
    number?: string;
  };

  const errors: ErrorValidation[] = [];

  if (!ownerId || !validator.isUUID(String(ownerId))) {
    errors.push({ ownerId: 'ID власника має бути валідним UUID.' });
  }

  if (validator.isEmpty(number ?? '')) {
    errors.push({ number: 'Номер карти є обовʼязковим.' });
  }

  if (balance !== undefined && balance !== null && !validator.isFloat(String(balance), { min: 0 })) {
    errors.push({ balance: 'Баланс повинен бути невідʼємним числом.' });
  }

  if (errors.length > 0) {
    return next(
      new CustomError(400, 'Validation', 'Помилка валідації створення транспортної карти.', null, null, errors),
    );
  }

  return next();
};
