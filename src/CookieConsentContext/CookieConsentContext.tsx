import { createContext } from "react"

import { CookieCategories, CookieCategoryId } from "@/Cookie/Cookies"

export type CookieConsentChoice = "REJECT_ALL" | "ACCEPT_ALL" | "CUSTOMIZE"

export type CookieConsentDetails = {
  choice: CookieConsentChoice
  choiceDate: string
  enabledCategories: CookieCategoryId[]
  cookieExpirationDate: string
}

export type CookieConsentContextProps = {
  cookieCategories: CookieCategories
  toggleCategoryIsEnable: (cookieCategoryId: CookieCategoryId) => void
  isCookieCategoryIdConsensual: (cookieCategoryId: CookieCategoryId) => boolean
  isConsentRequired: boolean
  askForConsent: () => void
  giveConsent: (choice: CookieConsentChoice) => void
  rejectConsent: () => void
  cookieConsentDetails: CookieConsentDetails | undefined
}

export const CookieConsentContext = createContext<CookieConsentContextProps | undefined>(undefined)
