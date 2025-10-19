import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

const isLongitude = (value: unknown) => validator.isFloat(String(value), { min: -180, max: 180 });
const isLatitude = (value: unknown) => validator.isFloat(String(value), { min: -90, max: 90 });

export const validatorUpdateVehicleGpsLog = async (req: Request, _res: Response, next: NextFunction) => {
  const { transportId, longitude, latitude, recordedAt } = req.body as {
    transportId?: string | null;
    longitude?: string | number | null;
    latitude?: string | number | null;
    recordedAt?: string | Date | null;
  };

  const errors: ErrorValidation[] = [];

  if (transportId !== undefined && transportId !== null && !validator.isUUID(String(transportId))) {
    errors.push({ transportId: 'ID транспорту має бути валідним UUID.' });
  }

  if (longitude !== undefined && longitude !== null && !isLongitude(longitude)) {
    errors.push({ longitude: 'Довгота повинна бути числом у діапазоні [-180; 180].' });
  }

  if (latitude !== undefined && latitude !== null && !isLatitude(latitude)) {
    errors.push({ latitude: 'Широта повинна бути числом у діапазоні [-90; 90].' });
  }

  if (recordedAt !== undefined && recordedAt !== null && !validator.isISO8601(String(recordedAt))) {
    errors.push({ recordedAt: 'Дата запису повинна бути у форматі ISO-8601.' });
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    errors.push({ payload: 'Потрібно вказати хоча б одне поле для оновлення.' });
  }

  if (errors.length > 0) {
    return next(
      new CustomError(400, 'Validation', 'Помилка валідації оновлення GPS-запису транспорту.', null, null, errors),
    );
  }

  return next();
};
