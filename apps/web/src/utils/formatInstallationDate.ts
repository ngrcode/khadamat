export const formatInstallationDate = (date?: string) => {
  if (!date) return null;

  return date.replaceAll('/', '-');
};