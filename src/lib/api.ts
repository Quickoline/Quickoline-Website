import { API_ENDPOINTS } from './config';

interface RequestOptions extends RequestInit {
  token?: string;
}

async function fetchWithAuth(url: string, options: RequestOptions = {}) {
  // Get the auth token from wherever you store it (localStorage, cookies, etc.)
  const token = options.token || localStorage.getItem('authToken');

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Handle unauthorized responses
  if (response.status === 401) {
    // Handle token expiration - redirect to login or refresh token
    // window.location.href = '/login';
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'API request failed');
  }

  return response;
}

export const blogApi = {
  async list() {
    const response = await fetchWithAuth(API_ENDPOINTS.blogs.list);
    return response.json();
  },

  async getById(id: string) {
    const response = await fetchWithAuth(API_ENDPOINTS.blogs.detail(id));
    return response.json();
  },

  async create(data: any) {
    const response = await fetchWithAuth(API_ENDPOINTS.blogs.create, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async update(id: string, data: any) {
    const response = await fetchWithAuth(API_ENDPOINTS.blogs.update(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async delete(id: string) {
    await fetchWithAuth(API_ENDPOINTS.blogs.delete(id), {
      method: 'DELETE',
    });
  },
};

export const tagApi = {
  async list() {
    const response = await fetchWithAuth(API_ENDPOINTS.tags.list);
    return response.json();
  },

  async create(data: { name: string }) {
    const response = await fetchWithAuth(API_ENDPOINTS.tags.create, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async update(id: string, data: { name: string }) {
    const response = await fetchWithAuth(API_ENDPOINTS.tags.update(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async delete(id: string) {
    await fetchWithAuth(API_ENDPOINTS.tags.delete(id), {
      method: 'DELETE',
    });
  },
}; 