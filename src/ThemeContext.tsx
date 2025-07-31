import { createContext, useEffect, useState, ReactNode } from 'react'
import { useContext } from 'react'

type ThemeContextType = {
  isDarkTheme: boolean
  setDarkTheme: () => void
  setLightTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true)

  const setDarkTheme = () => {
    document.documentElement.classList.add('dark')
    setIsDarkTheme(true)
    localStorage.setItem('theme', 'dark')
  }

  const setLightTheme = () => {
    document.documentElement.classList.remove('dark')
    setIsDarkTheme(false)
    localStorage.setItem('theme', 'light')
  }

  useEffect(() => {
    const value = localStorage.getItem('theme')

    if (value === 'light') {
      setLightTheme()
      return
    }

    setDarkTheme()
  }, [])

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setDarkTheme, setLightTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within a ThemeProvider')
  return context
}