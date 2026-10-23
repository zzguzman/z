/* Matches a model against a free-text query. The label, id and description
   are all searched, so "4K" or "audio" find a model by what it does. */
export function matchesModelQuery(
  model: { label: string; id: string },
  description: string,
  query: string,
): boolean {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return `${model.label} ${model.id} ${description}`.toLowerCase().includes(needle);
}

/* Keeps the catalog order: a substring filter does not rank, so the first
   match is whichever model the catalog lists first. */
export function filterModels<T extends { label: string; id: string }>(
  models: readonly T[],
  describe: (model: T) => string,
  query: string,
): T[] {
  return models.filter((model) => matchesModelQuery(model, describe(model), query));
}
