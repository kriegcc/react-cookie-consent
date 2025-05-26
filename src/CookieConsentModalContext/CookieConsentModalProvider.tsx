import { FC, ReactNode, useCallback, useState } from "react"

import { CookieConsentModalContext } from "./CookieConsentModalContext"

export const CookieConsentModalProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = useCallback(() => {
    setIsModalOpen(true)
  }, [])
  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return (
    <CookieConsentModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </CookieConsentModalContext.Provider>
  )
}
