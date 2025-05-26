import { useContext } from "react"

import { ConsentStorageContext } from "./ConsentStorageContext"

export const useConsentStorage = () => {
  const context = useContext(ConsentStorageContext)
  if (context === undefined) {
    throw new Error("useConsentStorage must be used within a ConsentStorageProvider")
  }
  return context
}
