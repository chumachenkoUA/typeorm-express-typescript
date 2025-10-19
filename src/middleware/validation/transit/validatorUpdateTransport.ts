import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorUpdateTransport = async (req: Request, _res: Response, next: NextFunction) => {
  const { boardNumber, capacity, transportTypeId, routeId } = req.body as {
    boardNumber?: string;
    capacity?: number | string;
    transportTypeId?: string | null;
    routeId?: string | null;
  };

  const errors: ErrorValidation[] = [];

  if (boardNumber !== undefined && validator.isEmpty(boardNumber ?? '')) {
    errors.push({ boardNumber: 'Бортовий номер не може бути порожнім.' });
  }

  if (capacity !== undefined && capacity !== null && !validator.isInt(String(capacity), { min: 1 })) {
    errors.push({ capacity: 'Вмістимість повинна бути додатним цілим числом.' });
  }

  if (transportTypeId !== undefined && transportTypeId !== null && !validator.isUUID(String(transportTypeId))) {
    errors.push({ transportTypeId: 'ID типу транспорту має бути валідним UUID.' });
  }

  if (routeId !== undefined && routeId !== null && !validator.isUUID(String(routeId))) {
    errors.push({ routeId: 'ID маршруту має бути валідним UUID.' });
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    errors.push({ payload: 'Потрібно вказати хоча б одне поле для оновлення.' });
  }

  if (errors.length > 0) {
    const validationError = new CustomError(
      400,
      'Validation',
      'Помилка валідації оновлення транспорту.',
      null,
      null,
      errors,
    );
    return next(validationError);
  }

  return next();
};
