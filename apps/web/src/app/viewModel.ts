
const fixUrl = (url: string): string => {
  const fixedUrl = process.env.BASE_URL?.concat(url);
  return fixedUrl as string;
};

const fetchData = async (url: string) => {
  const response = await fetch(fixUrl(url));
  if (response.ok) {
    const data = await response.json();
    return await data;
  }
};
