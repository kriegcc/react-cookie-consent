import { createContext } from "react"

import { Language } from "@/types"

export type LanguageContextProps = {
  language: Language
  setLanguage: (language: Language) => void
}

export const LanguageContext = createContext<LanguageContextProps | undefined>(undefined)
