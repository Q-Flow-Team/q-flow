export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return

  const { isAuthenticated, isAdmin, isStaff } = useAuth()
  const path = to.path

  if (path.startsWith('/admin')) {
    if (!isAuthenticated.value) return navigateTo('/login')
    if (!isAdmin.value) return navigateTo('/staff')
  }

  if (path.startsWith('/staff')) {
    if (!isAuthenticated.value) return navigateTo('/login')
    if (!isStaff.value) return navigateTo('/admin')
  }
})
