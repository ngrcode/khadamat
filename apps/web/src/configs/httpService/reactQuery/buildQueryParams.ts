
export const buildTerminalQueryParams = (
  search: any,
  pagination: any
) => {
  return {
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    ...Object.fromEntries(
      Object.entries(search).filter(([, value]) => Boolean(value))
    ),
  };
};