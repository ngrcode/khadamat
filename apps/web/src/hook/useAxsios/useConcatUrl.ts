export const useConcatUrl = (): ((url: string) => string) => {
  const fixUrl = (url: string) => process.env.End_Point?.concat(url) as string;
  return fixUrl;
};
