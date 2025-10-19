import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

import { FineAppealStatus } from 'orm/entities/transit';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorUpdateFineAppeal = async (req: Request, _res: Response, next: NextFunction) => {
  const { fineId, message, status, submittedAt } = req.body as {
    fineId?: string | null;
    message?: string;
    status?: FineAppealStatus;
    submittedAt?: string | Date | null;
  };

  const errors: ErrorValidation[] = [];

  if (fineId !== undefined && fineId !== null && !validator.isUUID(String(fineId))) {
    errors.push({ fineId: 'ID штрафу має бути валідним UUID.' });
  }

  if (message !== undefined && validator.isEmpty(message ?? '')) {
    errors.push({ message: 'Повідомлення не може бути порожнім.' });
  }

  if (status !== undefined && !Object.values(FineAppealStatus).includes(status)) {
    errors.push({ status: 'Невірний статус оскарження.' });
  }

  if (submittedAt !== undefined && submittedAt !== null && !validator.isISO8601(String(submittedAt))) {
    errors.push({ submittedAt: 'Дата подання повинна бути у форматі ISO-8601.' });
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    errors.push({ payload: 'Потрібно вказати хоча б одне поле для оновлення.' });
  }

  if (errors.length > 0) {
    return next(
      new CustomError(400, 'Validation', 'Помилка валідації оновлення оскарження штрафу.', null, null, errors),
    );
  }

  return next();
};
