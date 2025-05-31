import { FC, ReactNode, useEffect, useState } from "react"

import { ConsentStorageProvider } from "@/ConsentStorage/context/ConsentStorageProvider"
import { CookieCategories, CookieCategory, CookieCategoryId } from "@/Cookie/Cookies"
import { CookieConsentModalProvider } from "@/CookieConsentModalContext/CookieConsentModalProvider"

import {
  CookieConsentContext,
  CookieConsentChoice,
  CookieConsentDetails,
} from "./CookieConsentContext"
import {
  wasConsentGiven,
  getStoredConsensualCookieCategoryIds,
  storeConsensualCookieCategoryIds,
  storeConsent,
  getStoredConsentDetails,
  getStoredCookieConsentExpirationDate,
  removeCookieConsent,
} from "./storedCookieConsentUtils"

export type CookieConsentProviderProps = {
  initialCookieCategories: CookieCategories
  children?: ReactNode
}

export const CookieConsentProvider: FC<CookieConsentProviderProps> = ({
  initialCookieCategories,
  children,
}) => {
  const [cookieCategories, setCookieCategories] =
    useState<CookieCategories>(initialCookieCategories)

  const [isConsentRequired, setIsConsentRequired] = useState(!wasConsentGiven())

  // initialCookieCategories can be changed by consumer, for example when switching language
  useEffect(() => {
    const cookieCategories =
      setCookieCategoriesIsEnabledAccordingToStoredPreferences(initialCookieCategories)
    setCookieCategories(cookieCategories)
    return () => {
      storeConsensualCookieCategoryIds(getConsensualCookieCategoryIds(cookieCategories))
    }
  }, [initialCookieCategories])

  const toggleCategoryIsEnable = (cookieCategoryId: CookieCategoryId) => {
    const cookieCategory = cookieCategories.get(cookieCategoryId)
    if (cookieCategory) {
      cookieCategory.toggleIsEnabled()
      storeConsensualCookieCategoryIds(getConsensualCookieCategoryIds(cookieCategories))
      setCookieCategories(new Map<CookieCategoryId, CookieCategory>(cookieCategories))
    }
  }

  const isCookieCategoryIdConsensual = (cookieCategoryId: CookieCategoryId) => {
    return getConsensualCookieCategoryIds(cookieCategories).includes(cookieCategoryId)
  }

  const giveConsent = (choice: CookieConsentChoice) => {
    switch (choice) {
      case "ACCEPT_ALL":
        // enable all categories
        cookieCategories.forEach((cookieCategory) => cookieCategory.enable())
        break
      case "REJECT_ALL":
        // disable all categories
        cookieCategories.forEach((cookieCategory) => {
          if (!cookieCategory.isMandatory) {
            cookieCategory.disable()
          }
        })
        break
    }

    storeConsensualCookieCategoryIds(getConsensualCookieCategoryIds(cookieCategories))
    setCookieCategories(new Map<CookieCategoryId, CookieCategory>(cookieCategories))
    storeConsent(choice)
    setIsConsentRequired(false)
  }

  const rejectConsent = () => {
    cookieCategories.forEach((cookieCategory) => {
      if (!cookieCategory.isMandatory) {
        cookieCategory.disable()
      }
    })
    setCookieCategories(new Map<CookieCategoryId, CookieCategory>(cookieCategories))
    removeCookieConsent()
    setIsConsentRequired(true)
  }

  const askForConsent = () => {
    setIsConsentRequired(true)
  }

  const getCookieConsentDetails = (): CookieConsentDetails | undefined => {
    const storedDetails = getStoredConsentDetails()
    if (storedDetails === undefined) {
      return undefined
    }

    return {
      choice: storedDetails.choice,
      choiceDate: storedDetails.date,
      enabledCategories: getConsensualCookieCategoryIds(cookieCategories),
      cookieExpirationDate: getStoredCookieConsentExpirationDate() || "",
    }
  }

  return (
    <CookieConsentContext.Provider
      value={{
        cookieCategories,
        toggleCategoryIsEnable,
        isCookieCategoryIdConsensual,
        isConsentRequired,
        askForConsent,
        giveConsent,
        rejectConsent,
        cookieConsentDetails: getCookieConsentDetails(),
      }}
    >
      <ConsentStorageProvider>
        <CookieConsentModalProvider>{children}</CookieConsentModalProvider>
      </ConsentStorageProvider>
    </CookieConsentContext.Provider>
  )
}

// function fetchAndInitializeLocalizedCookieCategories(language: Language): CookieCategories {
//   const cookieCategories = getTranslatedCookieData(language)
//   setCookieCategoriesIsEnabledAccordingToStoredPreferences(cookieCategories)
//   return cookieCategories
// }

function getConsensualCookieCategoryIds(cookieCategories: CookieCategories): CookieCategoryId[] {
  return Array.from(cookieCategories.values())
    .filter((category) => category.isEnabled)
    .map((category) => category.id)
}

function setCookieCategoriesIsEnabledAccordingToStoredPreferences(
  cookieCategories: CookieCategories,
): CookieCategories {
  const storedConsensualCookieCategories = getStoredConsensualCookieCategoryIds()
  cookieCategories.forEach((cookieCategory, cookieCategoryId) => {
    if (storedConsensualCookieCategories.includes(cookieCategoryId)) {
      cookieCategory.enable()
    }
  })
  return cookieCategories
}
