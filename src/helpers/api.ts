import router from '@/router';
import { useToast } from 'vue-toastification';

const url = import.meta.env.VITE_API_URL;

async function api<T>(
  endpoint: string,
  method: string,
  token: boolean,
  bodyContent?: any,
): Promise<T | null> {
  const toast = useToast();
  const headers: any = {};
  let requestBody: any = {};
  const start = Date.now();

  const setUrl = () => {
    if (endpoint.includes('?')) return `${url}/api/${endpoint}`;
    return `${url}/api/${endpoint}/`;
  };

  const setContentTypeAndBody = () => {
    if (method === 'POST' || method === 'PUT') {
      headers['Content-Type'] = 'application/json';
      requestBody = JSON.stringify(bodyContent);
      return;
    }
  };

  const setAutorizationHeader = () => {
    headers['Authorization'] = token ? `Bearer ${localStorage.getItem('token')}` : '';
  };

  const handleForceLogout = () => {
    toast.error('Twoja sesja wygasła, zaloguj się ponownie.');
    localStorage.setItem('auth', 'false');
    localStorage.setItem('user', '');
    router.push('/login').then(() => window.location.reload());
  };

  const handleResponse = async (res: Response): Promise<any> => {
    if (res.ok) {
      const end = Date.now();
      toast.info(`API ${method} ${endpoint} ${end - start}ms`);
      return res.json();
    }
    if (res.status == 401) {
      if (endpoint === 'login') toast.error('Nieprawidłowy login lub hasło.');
      return Promise.reject('Unauthorized');
    }
    const response = await res.json();
    const errorMessage = response.detail || response.message || response.error || 'Błąd API';
    toast.error(errorMessage);
    return Promise.reject(errorMessage);
  };

  try {
    setContentTypeAndBody();
    setAutorizationHeader();

    const response = await fetch(setUrl(), {
      method,
      headers,
      body: (method === 'POST' || method === 'PUT') && requestBody ? requestBody : undefined,
    });

    return await handleResponse(response);
  } catch (err) {
    return null;
  }
}

// Helper class for API calls
class apiHelper {
  static async get<T>(endpoint: string, token: boolean): Promise<T | null> {
    return await api<T>(endpoint, 'GET', token);
  }

  static async post<T>(endpoint: string, token: boolean, bodyContent: any): Promise<T | null> {
    return await api<T>(endpoint, 'POST', token, bodyContent);
  }

  static async put<T>(endpoint: string, token: boolean, bodyContent: any): Promise<T | null> {
    return await api<T>(endpoint, 'PUT', token, bodyContent);
  }

  static async delete<T>(endpoint: string, token: boolean): Promise<T | null> {
    return await api<T>(endpoint, 'DELETE', token);
  }
}

// Shared API instance
export const apiInstance = apiHelper;
