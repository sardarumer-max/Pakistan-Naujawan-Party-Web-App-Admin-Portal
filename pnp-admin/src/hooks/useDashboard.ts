import { useQuery } from '@tanstack/react-query';
import { getDashboardStats, getRecentActivity } from '../services/dashboard.service';

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: getDashboardStats,
    refetchInterval: 60_000, /* refresh every minute */
  });
}

export function useRecentActivity() {
  return useQuery({
    queryKey: ['dashboard', 'activity'],
    queryFn: getRecentActivity,
    refetchInterval: 30_000, /* refresh every 30s */
  });
}
