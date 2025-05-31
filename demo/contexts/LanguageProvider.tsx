import { FC, ReactNode, useState } from "react"

// import { DEFAULT_LANGUAGE, Language } from "@demo/types"
// import { DEFAULT_LANGUAGE, Language } from "@demo/types"

import { Language } from "@/index"
import { DEFAULT_LANGUAGE } from "@demo/types"

import { LanguageContext } from "./LanguageContext"

export const LanguageProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE)

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
