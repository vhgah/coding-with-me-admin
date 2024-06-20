import type { User } from '@/types/user'

export const userFactory = (user: Partial<User> = {}): User => {
  return {
    ip_address: user.ip_address || '',
    referral_url: user.referral_url || '',
    country: user.country || '',
    city: user.city || '',
    state: user.state || '',
    is_robot: user.is_robot || false,
    user_agent: user.user_agent || '',
    device: user.device || '',
    created_at: user.created_at || '',
  }
}