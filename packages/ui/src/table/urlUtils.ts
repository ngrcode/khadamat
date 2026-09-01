// utils/urlUtils.ts
export const getQueryParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    page: parseInt(params.get('page') || '1', 10),
    pageSize: parseInt(params.get('pageSize') || '10', 10),
  };
};

export const setQueryParams = (page: number, pageSize: number) => {
  const params = new URLSearchParams();
  params.set('page', page.toString());
  params.set('pageSize', pageSize.toString());
  window.history.replaceState(null, '', `?${params.toString()}`);
};
