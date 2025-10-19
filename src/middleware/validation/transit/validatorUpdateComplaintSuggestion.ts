import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

import { ComplaintStatus } from 'orm/entities/transit';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorUpdateComplaintSuggestion = async (req: Request, _res: Response, next: NextFunction) => {
  const { passengerId, type, message, tripId, status } = req.body as {
    passengerId?: string | null;
    type?: string;
    message?: string;
    tripId?: string | null;
    status?: ComplaintStatus;
  };

  const errors: ErrorValidation[] = [];

  if (passengerId !== undefined && passengerId !== null && !validator.isUUID(String(passengerId))) {
    errors.push({ passengerId: 'ID пасажира має бути валідним UUID.' });
  }

  if (type !== undefined && validator.isEmpty(type ?? '')) {
    errors.push({ type: 'Тип звернення не може бути порожнім.' });
  }

  if (message !== undefined && validator.isEmpty(message ?? '')) {
    errors.push({ message: 'Повідомлення не може бути порожнім.' });
  }

  if (status !== undefined && !Object.values(ComplaintStatus).includes(status)) {
    errors.push({ status: 'Невірний статус звернення.' });
  }

  if (tripId !== undefined && tripId !== null && !validator.isUUID(String(tripId))) {
    errors.push({ tripId: 'ID поїздки має бути валідним UUID.' });
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    errors.push({ payload: 'Потрібно вказати хоча б одне поле для оновлення.' });
  }

  if (errors.length > 0) {
    return next(
      new CustomError(400, 'Validation', 'Помилка валідації оновлення звернення/скарги.', null, null, errors),
    );
  }

  return next();
};
