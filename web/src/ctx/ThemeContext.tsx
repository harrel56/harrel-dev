import {createContext, PropsWithChildren, useEffect, useMemo} from 'react'
import {useLocalStorage} from 'react-use'

export type Theme = 'light' | 'dark'

export interface ThemeResponse {
  theme: Theme
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeResponse>({} as ThemeResponse)

export const ThemeContextProvider = ({children}: PropsWithChildren) => {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  useEffect(() => {
    const classList = document.documentElement.classList
    if (theme === 'dark') {
      classList.remove('light')
      classList.add('dark')
    } else {
      classList.remove('dark')
      classList.add('light')
    }
  }, [theme])
  const data = useMemo(() => ({
    theme: theme!,
    toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark')
  }), [theme, setTheme])
  return (
    <ThemeContext.Provider value={data}>
      {children}
    </ThemeContext.Provider>
  )
}