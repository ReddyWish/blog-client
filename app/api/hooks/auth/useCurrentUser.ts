import { useQuery } from '@tanstack/react-query';
import { authService } from '../../services/auth.service';
import { queryKeys } from '../../queryClient';

export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.auth.currentUser,
    queryFn: ({ signal }) => authService.getCurrentUser(signal),
    retry: false,
  });
}
