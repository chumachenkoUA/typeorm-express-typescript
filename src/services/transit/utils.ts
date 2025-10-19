type RelationMapping = Record<string, string>;

export const applyRelationIds = <T extends Record<string, any>>(
  dto: T,
  mapping: RelationMapping,
): Record<string, any> => {
  const result: Record<string, any> = { ...dto };

  Object.entries(mapping).forEach(([property, dtoKey]) => {
    if (!(dtoKey in result)) {
      return;
    }

    const value = result[dtoKey];
    delete result[dtoKey];

    if (value === undefined) {
      return;
    }

    result[property] = value === null ? null : { id: value };
  });

  return result;
};
