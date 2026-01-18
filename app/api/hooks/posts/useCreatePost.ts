import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postsService } from '../../services/posts.service';
import { queryKeys } from '../../queryClient';

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postsService.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all });
    },
  });
}
