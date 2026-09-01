export const formatNumber = (value: number | string) => {
  if (value === null || value === undefined) return '-';
  return Number(value).toLocaleString('en-US');
};
