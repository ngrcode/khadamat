export const useFetch = async (url: string, cache: RequestCacheType) => {
  try {
    const fullUrl = `${process.env.BASE_IMG}${url}`;
    const response = await fetch(fullUrl, { cache });

    if (!response.ok) {
      throw new Error(`Error fetching data from ${url}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw error; 
  }
};

export type RequestCacheType =
  | 'default'
  | 'force-cache'
  | 'no-cache'
  | 'no-store'
  | 'only-if-cached'
  | 'reload';
