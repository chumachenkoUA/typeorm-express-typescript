import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

const isLongitude = (value: unknown) => validator.isFloat(String(value), { min: -180, max: 180 });
const isLatitude = (value: unknown) => validator.isFloat(String(value), { min: -90, max: 90 });

export const validatorCreateRoutePoint = async (req: Request, _res: Response, next: NextFunction) => {
  const { routeId, longitude, latitude, previousPointId, nextPointId } = req.body as {
    routeId?: string;
    longitude?: string | number;
    latitude?: string | number;
    previousPointId?: string | null;
    nextPointId?: string | null;
  };

  const errors: ErrorValidation[] = [];

  if (!routeId || !validator.isUUID(String(routeId))) {
    errors.push({ routeId: 'ID маршруту має бути валідним UUID.' });
  }

  if (longitude === undefined || longitude === null || !isLongitude(longitude)) {
    errors.push({ longitude: 'Довгота повинна бути числом у діапазоні [-180; 180].' });
  }

  if (latitude === undefined || latitude === null || !isLatitude(latitude)) {
    errors.push({ latitude: 'Широта повинна бути числом у діапазоні [-90; 90].' });
  }

  if (previousPointId !== undefined && previousPointId !== null && !validator.isUUID(String(previousPointId))) {
    errors.push({ previousPointId: 'Попередня точка має бути валідним UUID.' });
  }

  if (nextPointId !== undefined && nextPointId !== null && !validator.isUUID(String(nextPointId))) {
    errors.push({ nextPointId: 'Наступна точка має бути валідним UUID.' });
  }

  if (errors.length > 0) {
    return next(new CustomError(400, 'Validation', 'Помилка валідації створення точки маршруту.', null, null, errors));
  }

  return next();
};
