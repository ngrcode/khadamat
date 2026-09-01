import { t } from '@/components';

export const useActions = () => {
  const getDeleteId = (record: any) => `id=${record.Id}`;

  const deleteProps = {
    urlDelete: 'api/1/NotificationPanel/Delete',
    titleDelete: t('titleDeleteContactUs'),
    getDeleteId: getDeleteId,
  };

  return {
    deleteProps,
  };
};
