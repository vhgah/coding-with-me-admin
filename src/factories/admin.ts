import type { Admin } from '@/types/admin'

export const adminFactory = (admin: Partial<Admin> = {}): Admin => {
  return {
    id: admin.id || null,
    username: admin.username || '',
    email: admin.email || '',
    last_login_at: admin.last_login_at || '',
    role: admin.role || ''
  }
}