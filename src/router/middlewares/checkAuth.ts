import { useAuthStore } from '@/stores/auth'

export default (to: any, from: any, next: any) => {
  const authStore = useAuthStore()

  const publishRoutes = [
    'login'
  ]

  if (publishRoutes.includes(to.name)) {
    next()
    return
  }

  if (authStore.token === '') {
    next({ name: 'login' })
    return
  }

  next()
}