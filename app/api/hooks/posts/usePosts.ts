import { useQuery } from '@tanstack/react-query';
import { postsService } from '../../services/posts.service';
import { queryKeys } from '../../queryClient';

export function usePosts() {
  return useQuery({
    queryKey: queryKeys.posts.list(),
    queryFn: async ({ signal }) => {
      const data = await postsService.getPosts(signal);
      return data.posts;
    },
  });
}
