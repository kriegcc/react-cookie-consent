import { useContext } from "react"

import { CookieConsentModalContext } from "./CookieConsentModalContext"

export const useCookieConsentModal = () => {
  const context = useContext(CookieConsentModalContext)
  if (context === undefined) {
    throw new Error("useCookieConsentModal must be used within a CookieConsentModalProvider")
  }
  return context
}
