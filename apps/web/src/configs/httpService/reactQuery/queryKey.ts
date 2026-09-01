export const terminalQueryKey = (
  search: Record<string, any>,
  current: number,
  size: number
) => {
  const sortedSearch = Object.entries(search)
    .filter(([_, v]) => v !== undefined && v !== null && v !== '')
    .sort(([a], [b]) => a.localeCompare(b));

  return ['terminals-performance', current, size, ...sortedSearch.flat()];
};