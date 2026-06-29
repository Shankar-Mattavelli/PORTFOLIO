import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { TRANSLATIONS } from '@/constants/translations'
import type { Lang } from '@/constants/translations'

interface LanguageContextValue {
  lang: Lang
  toggle: () => void
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'it',
  toggle: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('it')
  const toggle = () => setLang(l => (l === 'it' ? 'en' : 'it'))
  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}

export function useTrans() {
  const { lang } = useContext(LanguageContext)
  return TRANSLATIONS[lang]
}
