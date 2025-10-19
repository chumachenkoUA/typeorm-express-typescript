import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

import { RouteDirection } from 'orm/entities/transit';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorCreateRoute = async (req: Request, _res: Response, next: NextFunction) => {
  const { transportTypeId, number, direction, isActive } = req.body as {
    transportTypeId?: string;
    number?: string;
    direction?: RouteDirection;
    isActive?: boolean | string;
  };

  const errors: ErrorValidation[] = [];

  if (!transportTypeId || !validator.isUUID(String(transportTypeId))) {
    errors.push({ transportTypeId: 'ID типу транспорту має бути валідним UUID.' });
  }

  if (validator.isEmpty(number ?? '')) {
    errors.push({ number: 'Номер маршруту є обовʼязковим.' });
  }

  if (!direction || !Object.values(RouteDirection).includes(direction)) {
    errors.push({ direction: 'Напрямок повинен відповідати одному з дозволених значень.' });
  }

  if (isActive !== undefined) {
    const value = typeof isActive === 'string' ? isActive : String(isActive);
    if (!validator.isBoolean(value)) {
      errors.push({ isActive: 'Поле isActive повинно бути булевим значенням.' });
    }
  }

  if (errors.length > 0) {
    const validationError = new CustomError(
      400,
      'Validation',
      'Помилка валідації створення маршруту.',
      null,
      null,
      errors,
    );
    return next(validationError);
  }

  return next();
};
