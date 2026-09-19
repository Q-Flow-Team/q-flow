export type Theme = 'light' | 'dark'

export function useTheme() {
  const theme = useState<Theme>('qflow-theme', () => 'light')

  const apply = (next: Theme) => {
    if (!import.meta.client) return
    document.documentElement.classList.toggle('dark', next === 'dark')
    try {
      localStorage.setItem('qflow-theme', next)
    } catch {
      // Storage unavailable — theme simply won't persist.
    }
  }

  const init = () => {
    if (!import.meta.client) return
    const stored = (() => {
      try {
        return localStorage.getItem('qflow-theme') as Theme | null
      } catch {
        return null
      }
    })()
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    theme.value = stored === 'dark' || stored === 'light' ? stored : prefersDark ? 'dark' : 'light'
    apply(theme.value)
  }

  const toggle = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    apply(theme.value)
  }

  const setTheme = (next: Theme) => {
    theme.value = next
    apply(next)
  }

  return { theme, init, toggle, setTheme }
}
