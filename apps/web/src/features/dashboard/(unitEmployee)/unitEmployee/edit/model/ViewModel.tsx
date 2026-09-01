import {
  Yup,
  t,
  useAxiosQuery,
  useEffect,
  useQueryClient,
} from '@/components';
import { QUERY_NOTIFICATION_PANEL } from '@/constants/endPoint/notificationPanel';
import { useAxiosMutation } from '@/hook/useAxsios/useAxiosMutation';
import { usePutFormData } from '@/hook/usePutFormData';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

interface UseEditViewModelParams {
  dataEdit: any;
  handleData: () => void;
  onSuccess?: () => void;
}

export const useEditViewModel = ({
  dataEdit,
  handleData,
  onSuccess,
}: UseEditViewModelParams) => {
  

  const router = useRouter();
 

  const { submitFormData, sendData } = usePutFormData();


  const initialValues = useMemo(

    () => ({
      title: dataEdit?.title ?? '',
      status: dataEdit?.status ?? '',
    }),
    [dataEdit]
  );

  const isModified = false;

  useEffect(() => {
    if (sendData) {
      handleData?.();
      onSuccess?.();
    }
  }, [sendData, handleData, onSuccess]);

  const validationSchema = Yup.object({});

 const { mutateAsync, isPending } = useAxiosMutation(
     '/api/1.0/Employee/UpdateUnitEmployee'
   );
 
   const onSubmit = async (values) => {
     try {
       const queryParams = new URLSearchParams({
         title: values.title,
         status: values.status,
         id:dataEdit?.id
       }).toString();
 
       await mutateAsync({
         method: 'POST',
         query: `?${queryParams}`,
       } as any);
 
       queryClient.invalidateQueries({
         queryKey: ['users'],
       });
 
       router.push('/dashboard/unit');
     } catch (error: any) {
       console.error('CreateUnitEmployee Error:', error);
 
       if (error?.response) {
         console.error('Status:', error.response.status);
         console.error('Data:', error.response.data);
       } else {
         console.error('Message:', error?.message);
       }
     }
   };

  return {
    initialValues,
    validationSchema,
    onSubmit,
    isModified,
  };
};