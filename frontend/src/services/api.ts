import axios, { AxiosInstance, AxiosResponse } from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for adding auth tokens if needed
axiosInstance.interceptors.request.use(
  (config) => {
    // Add Firebase auth token if available
    const token = localStorage.getItem('firebase_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling - extracts data from response
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

// Typed API client that returns data directly (not AxiosResponse)
export const apiClient = {
  get: <T = any>(url: string) => axiosInstance.get<T>(url).then(res => res as unknown as T),
  post: <T = any>(url: string, data?: any) => axiosInstance.post<T>(url, data).then(res => res as unknown as T),
  put: <T = any>(url: string, data?: any) => axiosInstance.put<T>(url, data).then(res => res as unknown as T),
  delete: <T = any>(url: string) => axiosInstance.delete<T>(url).then(res => res as unknown as T),
}
