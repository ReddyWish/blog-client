import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../../services/auth.service';
import { queryKeys } from '../../queryClient';

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.auth.currentUser, data.user);
    },
  });
}
