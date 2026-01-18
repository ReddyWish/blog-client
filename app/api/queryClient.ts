import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: true,
      refetchOnMount: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

export const queryKeys = {
  auth: {
    currentUser: ['auth', 'currentUser'] as const,
  },
  posts: {
    all: ['posts'] as const,
    list: () => [...queryKeys.posts.all, 'list'] as const,
    detail: (id: number) => [...queryKeys.posts.all, 'detail', id] as const,
    userPosts: (userId: number) =>
      [...queryKeys.posts.all, 'user', userId] as const,
    myPosts: () => [...queryKeys.posts.all, 'my'] as const,
  },
} as const;
