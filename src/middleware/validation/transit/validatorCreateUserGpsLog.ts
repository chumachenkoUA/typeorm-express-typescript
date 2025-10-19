import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

const isLongitude = (value: unknown) => validator.isFloat(String(value), { min: -180, max: 180 });
const isLatitude = (value: unknown) => validator.isFloat(String(value), { min: -90, max: 90 });

export const validatorCreateUserGpsLog = async (req: Request, _res: Response, next: NextFunction) => {
  const { passengerId, longitude, latitude, recordedAt } = req.body as {
    passengerId?: string;
    longitude?: string | number;
    latitude?: string | number;
    recordedAt?: string | Date | null;
  };

  const errors: ErrorValidation[] = [];

  if (!passengerId || !validator.isUUID(String(passengerId))) {
    errors.push({ passengerId: 'ID пасажира має бути валідним UUID.' });
  }

  if (longitude === undefined || longitude === null || !isLongitude(longitude)) {
    errors.push({ longitude: 'Довгота повинна бути числом у діапазоні [-180; 180].' });
  }

  if (latitude === undefined || latitude === null || !isLatitude(latitude)) {
    errors.push({ latitude: 'Широта повинна бути числом у діапазоні [-90; 90].' });
  }

  if (recordedAt !== undefined && recordedAt !== null && !validator.isISO8601(String(recordedAt))) {
    errors.push({ recordedAt: 'Дата запису повинна бути у форматі ISO-8601.' });
  }

  if (errors.length > 0) {
    return next(
      new CustomError(400, 'Validation', 'Помилка валідації створення GPS-запису користувача.', null, null, errors),
    );
  }

  return next();
};
