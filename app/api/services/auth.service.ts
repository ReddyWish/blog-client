import { api } from '../client';
import type { paths, components } from '../api';

type SignupRequest = NonNullable<
  paths['/api/v1/signup']['post']['requestBody']
>['content']['application/json'];
type SignupResponse =
  paths['/api/v1/signup']['post']['responses']['201']['content']['application/json'];
type LoginRequest = NonNullable<
  paths['/api/v1/login']['post']['requestBody']
>['content']['application/json'];
type LoginResponse =
  paths['/api/v1/login']['post']['responses']['200']['content']['application/json'];
type User = components['schemas']['User'];

export const authService = {
  signup: (data: SignupRequest) =>
    api.post<SignupResponse>('/api/v1/signup', data),

  login: (data: LoginRequest) => api.post<LoginResponse>('/api/v1/login', data),

  logout: () => api.delete<{ message: string }>('/api/v1/logout'),

  getCurrentUser: (signal?: AbortSignal) =>
    api.get<User>('/api/v1/me', { signal }),
};
