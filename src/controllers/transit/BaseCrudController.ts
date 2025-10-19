import { NextFunction, Request, Response } from 'express';

import { BaseCrudService } from 'services/transit/BaseCrudService';

export class BaseCrudController<TEntity, CreateDto, UpdateDto> {
  constructor(
    private readonly service: BaseCrudService<TEntity, CreateDto, UpdateDto>,
    private readonly entityLabel: string,
  ) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const entity = await this.service.create(req.body as CreateDto);
      return res.customSuccess(201, `${this.entityLabel} created successfully.`, entity);
    } catch (error) {
      return next(error);
    }
  };

  findAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const entities = await this.service.findAll();
      return res.customSuccess(200, `${this.entityLabel} list retrieved successfully.`, entities);
    } catch (error) {
      return next(error);
    }
  };

  findOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const entity = await this.service.findOne(id);
      return res.customSuccess(200, `${this.entityLabel} retrieved successfully.`, entity);
    } catch (error) {
      return next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const entity = await this.service.update(id, req.body as UpdateDto);
      return res.customSuccess(200, `${this.entityLabel} updated successfully.`, entity);
    } catch (error) {
      return next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.service.delete(id);
      return res.customSuccess(200, `${this.entityLabel} deleted successfully.`);
    } catch (error) {
      return next(error);
    }
  };
}
