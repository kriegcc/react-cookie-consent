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
  // Process (set the enabled state) of the passed "initialCookieCategories" before storing in state:
  // "cookieCategories" are exposed by this provider and immediately used by consumers such as "ConsentStorageProvider" to load or delete cookies and storage items accordingly.
  // Using unprocessed (uninitialized) categories here would result in all items being deleted or incorrect consent logic.
  const processedInitialCookieCategories =
    setCookieCategoriesIsEnabledAccordingToStoredPreferences(initialCookieCategories)
  const [cookieCategories, setCookieCategories] = useState<CookieCategories>(
    processedInitialCookieCategories,
  )

  const [isConsentRequired, setIsConsentRequired] = useState(!wasConsentGiven())

  // initialCookieCategories can be changed by consumer, for example when switching language
  useEffect(() => {
    const processedInitialCookieCategories =
      setCookieCategoriesIsEnabledAccordingToStoredPreferences(initialCookieCategories)
    setCookieCategories(processedInitialCookieCategories)
    return () => {
      storeConsensualCookieCategoryIds(
        getConsensualCookieCategoryIds(processedInitialCookieCategories),
      )
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

function getConsensualCookieCategoryIds(cookieCategories: CookieCategories): CookieCategoryId[] {
  return Array.from(cookieCategories.values())
    .filter((category) => category.isEnabled)
    .map((category) => category.id)
}

function setCookieCategoriesIsEnabledAccordingToStoredPreferences(
  cookieCategories: CookieCategories,
): CookieCategories {
  const storedConsensualCookieCategories = getStoredConsensualCookieCategoryIds()
  // This method must be pure! Therefore, return a new object.
  return new Map(
    Array.from(cookieCategories.entries()).map(([cookieCategoryId, cookieCategory]) => {
      const copiedCookieCategory = cookieCategory.clone()
      if (storedConsensualCookieCategories.includes(cookieCategoryId)) {
        copiedCookieCategory.enable()
      } else {
        copiedCookieCategory.disable()
      }
      return [cookieCategoryId, copiedCookieCategory]
    }),
  )
}
