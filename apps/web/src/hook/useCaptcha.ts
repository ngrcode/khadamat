import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { showError } from '@/hook/useToust'

const fetchCaptcha = async () => {
  try {
    const response = await axios.get(`${process.env.BASE_URL}v1/auth/captcha`, {
      headers: {
        'Content-Type': 'application/json',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/png,image/svg+xml,*/*;q=0.8',
      },
    })
    return response.data
  } catch (error: any) {
    if (error.response?.status === 429) {
      showError('تعداد درخواست‌ها بیش از حد مجاز است. لطفاً چند لحظه صبر کنید.')
    } else {
      showError('خطایی در دریافت کپچا رخ داد')
    }
    throw error
  }
}

export const useCaptcha = () => {
  const {
    data,
    refetch: getCaptcha,
    isLoading: isCaptchaLoading,
  } = useQuery({
    queryKey: ['captcha'],
    queryFn: fetchCaptcha,
    refetchOnWindowFocus: false,
    enabled: false,
    retry: false,
    staleTime: 0,
  })
  

  return {
    captchaData: data,
    getCaptcha,
    isCaptchaLoading,
  }
}
