import type { components, paths } from './api';

// ============================================
// Schema Types (entities)
// ============================================

export type User = components['schemas']['User'];
export type Post = components['schemas']['Post'];
export type Author = components['schemas']['Author'];

// ============================================
// Error Types
// ============================================

export type ApiErrorResponse = components['schemas']['Error'];
export type ValidationErrors = components['schemas']['ValidationErrors'];

// ============================================
// Auth Request/Response Types
// ============================================

export type LoginRequest = NonNullable<
  paths['/api/v1/login']['post']['requestBody']
>['content']['application/json'];

export type LoginResponse =
  paths['/api/v1/login']['post']['responses']['200']['content']['application/json'];

export type SignupRequest = NonNullable<
  paths['/api/v1/signup']['post']['requestBody']
>['content']['application/json'];

export type SignupResponse =
  paths['/api/v1/signup']['post']['responses']['201']['content']['application/json'];

export type LogoutResponse =
  paths['/api/v1/logout']['delete']['responses']['200']['content']['application/json'];

// ============================================
// Posts Request/Response Types
// ============================================

export type PostsResponse =
  paths['/api/v1/posts']['get']['responses']['200']['content']['application/json'];

export type PostResponse =
  paths['/api/v1/posts/{id}']['get']['responses']['200']['content']['application/json'];

export type CreatePostRequest = NonNullable<
  paths['/api/v1/posts']['post']['requestBody']
>['content']['application/json'];

export type CreatePostResponse =
  paths['/api/v1/posts']['post']['responses']['201']['content']['application/json'];

export type UpdatePostRequest = NonNullable<
  paths['/api/v1/posts/{id}']['put']['requestBody']
>['content']['application/json'];

export type UpdatePostResponse =
  paths['/api/v1/posts/{id}']['put']['responses']['200']['content']['application/json'];

export type DeletePostResponse =
  paths['/api/v1/posts/{id}']['delete']['responses']['200']['content']['application/json'];

// ============================================
// User Posts Response Types
// ============================================

export type MyPostsResponse =
  paths['/api/v1/me/posts']['get']['responses']['200']['content']['application/json'];

export type UserPostsResponse =
  paths['/api/v1/users/{user_id}/posts']['get']['responses']['200']['content']['application/json'];
