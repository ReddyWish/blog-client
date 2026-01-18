import { api } from '../client';
import type { paths, components } from '../api';

type Post = components['schemas']['Post'];
type CreatePostRequest = NonNullable<
  paths['/api/v1/posts']['post']['requestBody']
>['content']['application/json'];
type UpdatePostRequest = NonNullable<
  paths['/api/v1/posts/{id}']['put']['requestBody']
>['content']['application/json'];

export const postsService = {
  getPosts: (signal?: AbortSignal) =>
    api.get<{ posts: Post[] }>('/api/v1/posts', { signal }),

  getPost: (id: number, signal?: AbortSignal) =>
    api.get<{ post: Post }>(`/api/v1/posts/${id}`, { signal }),

  createPost: (data: CreatePostRequest) =>
    api.post<{ post: Post; message: string }>('/api/v1/posts', data),

  updatePost: (id: number, data: UpdatePostRequest) =>
    api.put<{ post: Post; message: string }>(`/api/v1/posts/${id}`, data),

  deletePost: (id: number) =>
    api.delete<{ message: string }>(`/api/v1/posts/${id}`),

  getUserPosts: (userId: number, signal?: AbortSignal) =>
    api.get<{ posts: Post[] }>(`/api/v1/users/${userId}/posts`, { signal }),

  getMyPosts: (signal?: AbortSignal) =>
    api.get<{ posts: Post[] }>('/api/v1/me/posts', { signal }),
};
