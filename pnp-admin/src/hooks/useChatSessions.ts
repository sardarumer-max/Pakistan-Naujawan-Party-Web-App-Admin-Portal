import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getChatSessions, deleteChatSession } from '../services/chatSessions.service';
import { toast } from 'sonner';

export function useChatSessions(search?: string) {
  return useQuery({
    queryKey: ['chat_sessions', search],
    queryFn: () => getChatSessions(search),
  });
}

export function useDeleteChatSession() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteChatSession(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['chat_sessions'] });
      toast.success('Chat session deleted');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}
