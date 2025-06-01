import { FC, ReactNode, useEffect, useState } from "react"

import { CookieCategories } from "@/Cookie/Cookies"
import { useCookieConsent } from "@/CookieConsentContext/useCookieConsent"

import { ConsentStorageContext } from "./ConsentStorageContext"
import { ConsentStorage } from "../ConsentStorage"
import {
  ConsentStatus,
  ConsentStatusValue,
  ConsentStorageManager,
} from "../manager/ConsentStorageManager"

export const ConsentStorageProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const { cookieCategories } = useCookieConsent()

  const [consentStorageManager] = useState<ConsentStorageManager>(
    new ConsentStorageManager(toConsentStatus(cookieCategories)),
  )
  const [consentStorage] = useState<ConsentStorage>(new ConsentStorage(consentStorageManager))

  useEffect(() => {
    // TODO: currently triggers handleConsentRevocation in manager each time cookieCategories change
    // Maybe check if a category actually change to avoid unnecessary computation.
    // TODO 2: need to avoid to act on "uninitialized" (enable status) cookieCategories.
    // Otherwise, cookies are deleted.
    consentStorageManager.updateConsentStatus(toConsentStatus(cookieCategories))
  }, [consentStorageManager, cookieCategories])

  return (
    <ConsentStorageContext.Provider value={{ consentStorage }}>
      {children}
    </ConsentStorageContext.Provider>
  )
}

function toConsentStatus(cookieCategories: CookieCategories): ConsentStatus {
  const consentStatus: ConsentStatus = new Map<string, ConsentStatusValue>()
  cookieCategories.forEach((cookieCategory) => {
    const cookies = cookieCategory.cookies
    const isEnabled = cookieCategory.isEnabled
    cookies.forEach((cookie) => {
      consentStatus.set(cookie.key, { location: cookie.location, hasConsent: isEnabled })
    })
  })

  return consentStatus
}
