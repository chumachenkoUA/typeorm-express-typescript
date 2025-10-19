import { DeepPartial, EntityTarget } from 'typeorm';

import { BaseCrudService } from './BaseCrudService';
import { applyRelationIds } from './utils';

type RelationMapping = Record<string, string>;

type TransformFn<TInput, TOutput> = (dto: TInput) => DeepPartial<TOutput>;

type ServiceConfig<TEntity, CreateDto, UpdateDto> = {
  entity: EntityTarget<TEntity>;
  entityName: string;
  relations?: string[];
  relationIdMap?: RelationMapping;
  transformCreateDto?: TransformFn<CreateDto, TEntity>;
  transformUpdateDto?: TransformFn<UpdateDto, TEntity>;
};

export class ConfiguredCrudService<TEntity, CreateDto, UpdateDto> extends BaseCrudService<
  TEntity,
  CreateDto,
  UpdateDto
> {
  protected readonly entity: EntityTarget<TEntity>;
  protected readonly entityName: string;
  protected readonly relations: string[];
  private readonly relationIdMap: RelationMapping;
  private readonly customCreateTransform?: TransformFn<CreateDto, TEntity>;
  private readonly customUpdateTransform?: TransformFn<UpdateDto, TEntity>;

  constructor(config: ServiceConfig<TEntity, CreateDto, UpdateDto>) {
    super();
    this.entity = config.entity;
    this.entityName = config.entityName;
    this.relations = config.relations ?? [];
    this.relationIdMap = config.relationIdMap ?? {};
    this.customCreateTransform = config.transformCreateDto;
    this.customUpdateTransform = config.transformUpdateDto;
  }

  protected transformCreateDto(dto: CreateDto): DeepPartial<TEntity> {
    const transformed = this.customCreateTransform
      ? this.customCreateTransform(dto)
      : (dto as unknown as Record<string, unknown>);
    return applyRelationIds(transformed, this.relationIdMap) as DeepPartial<TEntity>;
  }

  protected transformUpdateDto(dto: UpdateDto): DeepPartial<TEntity> {
    const transformed = this.customUpdateTransform
      ? this.customUpdateTransform(dto)
      : (dto as unknown as Record<string, unknown>);
    return applyRelationIds(transformed, this.relationIdMap) as DeepPartial<TEntity>;
  }
}
