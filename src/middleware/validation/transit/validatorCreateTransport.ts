import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorCreateTransport = async (req: Request, _res: Response, next: NextFunction) => {
  const { boardNumber, capacity, transportTypeId, routeId } = req.body as {
    boardNumber?: string;
    capacity?: number | string;
    transportTypeId?: string;
    routeId?: string;
  };

  const errors: ErrorValidation[] = [];

  if (validator.isEmpty(boardNumber ?? '')) {
    errors.push({ boardNumber: 'Бортовий номер є обовʼязковим.' });
  }

  if (!capacity || !validator.isInt(String(capacity), { min: 1 })) {
    errors.push({ capacity: 'Вмістимість повинна бути додатним цілим числом.' });
  }

  if (!transportTypeId || !validator.isUUID(String(transportTypeId))) {
    errors.push({ transportTypeId: 'ID типу транспорту має бути валідним UUID.' });
  }

  if (!routeId || !validator.isUUID(String(routeId))) {
    errors.push({ routeId: 'ID маршруту має бути валідним UUID.' });
  }

  if (errors.length > 0) {
    const validationError = new CustomError(
      400,
      'Validation',
      'Помилка валідації створення транспорту.',
      null,
      null,
      errors,
    );
    return next(validationError);
  }

  return next();
};
