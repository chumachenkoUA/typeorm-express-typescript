import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorCreateTicket = async (req: Request, _res: Response, next: NextFunction) => {
  const { tripId, cardId, price, purchasedAt } = req.body as {
    tripId?: string;
    cardId?: string;
    price?: string | number;
    purchasedAt?: string | Date | null;
  };

  const errors: ErrorValidation[] = [];

  if (!tripId || !validator.isUUID(String(tripId))) {
    errors.push({ tripId: 'ID поїздки має бути валідним UUID.' });
  }

  if (!cardId || !validator.isUUID(String(cardId))) {
    errors.push({ cardId: 'ID транспортної карти має бути валідним UUID.' });
  }

  if (price === undefined || price === null || !validator.isFloat(String(price), { gt: 0 })) {
    errors.push({ price: 'Ціна повинна бути числом більше 0.' });
  }

  if (purchasedAt !== undefined && purchasedAt !== null && !validator.isISO8601(String(purchasedAt))) {
    errors.push({ purchasedAt: 'Дата покупки повинна бути у форматі ISO-8601.' });
  }

  if (errors.length > 0) {
    return next(new CustomError(400, 'Validation', 'Помилка валідації створення квитка.', null, null, errors));
  }

  return next();
};
