import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorUpdateCardTopUp = async (req: Request, _res: Response, next: NextFunction) => {
  const { cardId, amount, toppedUpAt } = req.body as {
    cardId?: string | null;
    amount?: string | number | null;
    toppedUpAt?: string | Date | null;
  };

  const errors: ErrorValidation[] = [];

  if (cardId !== undefined && cardId !== null && !validator.isUUID(String(cardId))) {
    errors.push({ cardId: 'Card id має бути валідним UUID.' });
  }

  if (amount !== undefined && amount !== null && !validator.isFloat(String(amount), { gt: 0 })) {
    errors.push({ amount: 'Сума повинна бути числом більше 0.' });
  }

  if (toppedUpAt !== undefined && toppedUpAt !== null && !validator.isISO8601(String(toppedUpAt))) {
    errors.push({ toppedUpAt: 'Дата поповнення повинна бути у форматі ISO-8601.' });
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    errors.push({ payload: 'Потрібно вказати хоча б одне поле для оновлення.' });
  }

  if (errors.length > 0) {
    return next(
      new CustomError(400, 'Validation', 'Помилка валідації оновлення поповнення карти.', null, null, errors),
    );
  }

  return next();
};
