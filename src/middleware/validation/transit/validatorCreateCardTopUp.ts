import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorCreateCardTopUp = async (req: Request, _res: Response, next: NextFunction) => {
  const { cardId, amount, toppedUpAt } = req.body as {
    cardId?: string;
    amount?: string | number;
    toppedUpAt?: string | Date | null;
  };

  const errors: ErrorValidation[] = [];

  if (!cardId || !validator.isUUID(String(cardId))) {
    errors.push({ cardId: 'Card id має бути валідним UUID.' });
  }

  if (amount === undefined || amount === null || !validator.isFloat(String(amount), { gt: 0 })) {
    errors.push({ amount: 'Сума повинна бути числом більше 0.' });
  }

  if (toppedUpAt !== undefined && toppedUpAt !== null && !validator.isISO8601(String(toppedUpAt))) {
    errors.push({ toppedUpAt: 'Дата поповнення повинна бути у форматі ISO-8601.' });
  }

  if (errors.length > 0) {
    return next(
      new CustomError(400, 'Validation', 'Помилка валідації створення поповнення карти.', null, null, errors),
    );
  }

  return next();
};
