import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

const isLongitude = (value: unknown) => validator.isFloat(String(value), { min: -180, max: 180 });
const isLatitude = (value: unknown) => validator.isFloat(String(value), { min: -90, max: 90 });

export const validatorCreateStop = async (req: Request, _res: Response, next: NextFunction) => {
  const { name, longitude, latitude } = req.body as {
    name?: string;
    longitude?: string | number;
    latitude?: string | number;
  };

  const errors: ErrorValidation[] = [];

  if (validator.isEmpty(name ?? '')) {
    errors.push({ name: 'Назва зупинки є обовʼязковою.' });
  }

  if (longitude === undefined || longitude === null || !isLongitude(longitude)) {
    errors.push({ longitude: 'Довгота повинна бути числом у діапазоні [-180; 180].' });
  }

  if (latitude === undefined || latitude === null || !isLatitude(latitude)) {
    errors.push({ latitude: 'Широта повинна бути числом у діапазоні [-90; 90].' });
  }

  if (errors.length > 0) {
    return next(new CustomError(400, 'Validation', 'Помилка валідації створення зупинки.', null, null, errors));
  }

  return next();
};
