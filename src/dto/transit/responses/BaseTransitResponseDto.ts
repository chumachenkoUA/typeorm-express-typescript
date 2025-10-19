export const toIsoString = (value?: Date | string | null): string | null => {
  if (value === undefined || value === null) {
    return null;
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
};

export const toEntityId = (entity?: { id: string } | null): string | null => {
  if (!entity) {
    return null;
  }

  return entity.id ?? null;
};

export const mapArray = <T, R>(collection: T[] | undefined, mapper: (item: T) => R): R[] => {
  if (!Array.isArray(collection)) {
    return [];
  }

  return collection.map(mapper);
};
