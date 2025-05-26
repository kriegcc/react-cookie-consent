import { createContext } from "react"

export type CookieConsentModalContextProps = {
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
}

export const CookieConsentModalContext = createContext<CookieConsentModalContextProps | undefined>(
  undefined,
)
