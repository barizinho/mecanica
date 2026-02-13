import { useState } from 'react';
import axios from 'axios';

const API_URL = '/api';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = async (method: string, endpoint: string, data?: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios({
        method,
        url: `${API_URL}${endpoint}`,
        data,
      });
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.error || 'Erro na requisição';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { request, loading, error, setError };
};
