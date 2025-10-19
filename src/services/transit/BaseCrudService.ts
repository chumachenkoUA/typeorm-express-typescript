import { DeepPartial, EntityTarget, getRepository, Repository } from 'typeorm';

import { CustomError } from 'utils/response/custom-error/CustomError';

type Action = 'create' | 'findAll' | 'findOne' | 'update' | 'delete';

export abstract class BaseCrudService<TEntity, CreateDto, UpdateDto> {
  protected abstract readonly entity: EntityTarget<TEntity>;
  protected abstract readonly entityName: string;
  protected readonly relations: string[] = [];

  protected get repository(): Repository<TEntity> {
    return getRepository(this.entity);
  }

  protected transformCreateDto(dto: CreateDto): DeepPartial<TEntity> {
    return dto as unknown as DeepPartial<TEntity>;
  }

  protected transformUpdateDto(dto: UpdateDto): DeepPartial<TEntity> {
    return dto as unknown as DeepPartial<TEntity>;
  }

  async create(dto: CreateDto): Promise<TEntity> {
    try {
      const payload = this.transformCreateDto(dto);
      const saved = await this.repository.save(payload as DeepPartial<TEntity>);
      return this.repository.findOneOrFail((saved as any).id, {
        relations: this.relations,
      });
    } catch (error) {
      throw this.buildError('create', error);
    }
  }

  async findAll(): Promise<TEntity[]> {
    try {
      return this.repository.find({ relations: this.relations });
    } catch (error) {
      throw this.buildError('findAll', error);
    }
  }

  async findOne(id: string): Promise<TEntity> {
    try {
      const entity = await this.repository.findOne(id, { relations: this.relations });
      if (!entity) {
        throw new CustomError(404, 'General', `${this.entityName} with id ${id} not found.`);
      }
      return entity;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw this.buildError('findOne', error);
    }
  }

  async update(id: string, dto: UpdateDto): Promise<TEntity> {
    try {
      const payload = this.transformUpdateDto(dto);
      const existing = await this.repository.findOne(id);
      if (!existing) {
        throw new CustomError(404, 'General', `${this.entityName} with id ${id} not found.`);
      }

      const entity = this.repository.merge(existing, payload as DeepPartial<TEntity>);
      const saved = await this.repository.save(entity as DeepPartial<TEntity>);
      return this.repository.findOneOrFail((saved as any).id, {
        relations: this.relations,
      });
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw this.buildError('update', error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const entity = await this.repository.findOne(id);
      if (!entity) {
        throw new CustomError(404, 'General', `${this.entityName} with id ${id} not found.`);
      }
      await this.repository.remove(entity);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw this.buildError('delete', error);
    }
  }

  protected buildError(action: Action, error: any): CustomError {
    const messages: Record<Action, string> = {
      create: `Failed to create ${this.entityName}.`,
      findAll: `Failed to retrieve ${this.entityName} list.`,
      findOne: `Failed to retrieve ${this.entityName}.`,
      update: `Failed to update ${this.entityName}.`,
      delete: `Failed to delete ${this.entityName}.`,
    };

    return new CustomError(400, 'Raw', messages[action], null, error);
  }
}
