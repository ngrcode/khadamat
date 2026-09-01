// Create a server-side fetch helper
export const useFetchSSR = async (url: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
      method: 'GET',
      cache: 'no-store', // Ensure fresh data is fetched on every request
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    return null;
  }
};
