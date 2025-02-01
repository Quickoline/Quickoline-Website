export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  blogs: {
    list: `${API_BASE_URL}/blogs`,
    detail: (id: string) => `${API_BASE_URL}/blogs/${id}`,
    create: `${API_BASE_URL}/blogs`,
    update: (id: string) => `${API_BASE_URL}/blogs/${id}`,
    delete: (id: string) => `${API_BASE_URL}/blogs/${id}`,
  },
  categories: {
    list: `${API_BASE_URL}/categories`,
    create: `${API_BASE_URL}/categories`,
    update: (id: string) => `${API_BASE_URL}/categories/${id}`,
    delete: (id: string) => `${API_BASE_URL}/categories/${id}`,
  },
  tags: {
    list: `${API_BASE_URL}/tags`,
    create: `${API_BASE_URL}/tags`,
    update: (id: string) => `${API_BASE_URL}/tags/${id}`,
    delete: (id: string) => `${API_BASE_URL}/tags/${id}`,
  }
}; 