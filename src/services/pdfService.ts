import {api} from 'boot/axios';
import {AxiosError} from 'axios';

const apiGetPdf = async (text: string): Promise<{
  responseUrl: string | null,
  message: string | null
}> => {
  const token = localStorage.getItem('token');
  const data = { text };

  try {
    const response = await api.post('/get-pdf', data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return {
      responseUrl: response.data.url,
      message: null
    }
  } catch (err) {
    const error = err as AxiosError;
    return {
      responseUrl: null,
      message: error.message
    }
  }
}

export { apiGetPdf };
