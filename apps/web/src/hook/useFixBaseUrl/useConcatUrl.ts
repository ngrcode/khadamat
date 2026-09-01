export const useFixBaseUrl = (url: string) =>
  process.env.BASE_IMG?.concat(url) as string;
