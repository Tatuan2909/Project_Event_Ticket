import type { LoginRequest, RegisterRequest, LoginResponse } from '../types/auth.types';
import api from './api';

class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>('/Auth/login', credentials);
      this.setTokens(response.data.accessToken, response.data.refreshToken);
      return response.data;
    } catch (error: any) {
      console.error('Login error:', error);
      const message = error.response?.data?.message || error.message || 'Đăng nhập thất bại';
      throw new Error(message);
    }
  }

  async register(userData: RegisterRequest): Promise<void> {
    try {
      await api.post('/Auth/register', userData);
    } catch (error: any) {
      console.error('Register error:', error);
      const message = error.response?.data?.message || error.message || 'Đăng ký thất bại';
      throw new Error(message);
    }
  }

  setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}

export default new AuthService();
