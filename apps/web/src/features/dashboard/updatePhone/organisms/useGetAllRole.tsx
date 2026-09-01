import { useAxiosQuery } from '@/components';
import { GET_UPDATEPHONE_URL, QUERY_UPDATEPHONE } from '@/constants/endPoint/updatephone';

export const useGetUpdatePhone = () => {
debugger
  const { data: dataUPDATEPHONE
    , isSuccess: isSuccessUPDATEPHONE
  } = useAxiosQuery({
    url: GET_UPDATEPHONE_URL,
    queryKey: [QUERY_UPDATEPHONE],
  });

  return { dataUPDATEPHONE, isSuccessUPDATEPHONE };
};
