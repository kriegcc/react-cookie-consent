import CookiesStorage from "js-cookie"

import { CookieCategoryId } from "@/Cookie/Cookies"

import { CookieConsentChoice } from "./CookieConsentContext"

const COOKIE_NAME = "cookie_consent_preferences"
const COOKIE_VALIDITY_IN_MS = 30 * 24 * 60 * 60 * 1000 // 30 days

type ConsentDetails = {
  date: string
  choice: CookieConsentChoice
}

type StoredCookieConsentData = {
  consensualCategoryIds: CookieCategoryId[]
  expires: string
  consentDetails: ConsentDetails | undefined
}

export function wasConsentGiven(): boolean {
  return getStoredConsentDetails() !== undefined
}

export function getStoredConsentDetails(): ConsentDetails | undefined {
  const rawValue = CookiesStorage.get(COOKIE_NAME)
  if (rawValue === undefined) {
    return undefined
  }

  try {
    const cookieData: StoredCookieConsentData = JSON.parse(rawValue)
    return cookieData.consentDetails
  } catch (error) {
    console.error("Error parsing cookie consent preferences:", error)
    return undefined
  }
}

export function storeConsent(choice: CookieConsentChoice) {
  const existingCookieValue = CookiesStorage.get(COOKIE_NAME)
  let cookieData: StoredCookieConsentData

  const consentDetails: ConsentDetails = {
    date: new Date(Date.now()).toISOString(),
    choice: choice,
  }

  if (existingCookieValue) {
    try {
      // override consentDetails in existing cookie
      cookieData = JSON.parse(existingCookieValue)
      cookieData.consentDetails = consentDetails
    } catch (error) {
      console.error("Error parsing existing cookie, creating a new one:", error)
      cookieData = {
        consensualCategoryIds: [],
        expires: new Date(Date.now() + COOKIE_VALIDITY_IN_MS).toISOString(),
        consentDetails: consentDetails,
      }
    }
  } else {
    // create a new cookie
    cookieData = {
      consensualCategoryIds: [],
      expires: new Date(Date.now() + COOKIE_VALIDITY_IN_MS).toISOString(),
      consentDetails: consentDetails,
    }
  }

  const rawValue = JSON.stringify(cookieData)
  CookiesStorage.set(COOKIE_NAME, rawValue, {
    sameSite: "strict",
    expires: new Date(cookieData.expires),
  })
}

export function removeCookieConsent() {
  if (!storedCookieConsentExists()) {
    return
  }
  CookiesStorage.remove(COOKIE_NAME)
}

export function storedCookieConsentExists(): boolean {
  return CookiesStorage.get(COOKIE_NAME) !== undefined
}

export function getStoredConsensualCookieCategoryIds(): CookieCategoryId[] {
  const rawValue = CookiesStorage.get(COOKIE_NAME)
  if (rawValue === undefined) {
    return []
  }

  try {
    const cookieData: StoredCookieConsentData = JSON.parse(rawValue)
    return cookieData.consensualCategoryIds || []
  } catch (error) {
    console.error("Error parsing cookie consent preferences:", error)
    return []
  }
}

export function storeConsensualCookieCategoryIds(consensualCategoryIds: CookieCategoryId[]) {
  const existingCookieValue = CookiesStorage.get(COOKIE_NAME)
  let cookieData: StoredCookieConsentData

  if (existingCookieValue) {
    try {
      // override existing cookie but keep the expiration date
      cookieData = JSON.parse(existingCookieValue)
      cookieData.consensualCategoryIds = consensualCategoryIds
    } catch (error) {
      console.error("Error parsing existing cookie, creating a new one:", error)
      cookieData = {
        consensualCategoryIds,
        expires: new Date(Date.now() + COOKIE_VALIDITY_IN_MS).toISOString(),
        consentDetails: undefined,
      }
    }
  } else {
    // create a new cookie
    cookieData = {
      consensualCategoryIds,
      expires: new Date(Date.now() + COOKIE_VALIDITY_IN_MS).toISOString(),
      consentDetails: undefined,
    }
  }

  const rawValue = JSON.stringify(cookieData)
  CookiesStorage.set(COOKIE_NAME, rawValue, {
    sameSite: "strict",
    expires: new Date(cookieData.expires),
  })
}

export function getStoredCookieConsentExpirationDate(): string | undefined {
  const rawValue = CookiesStorage.get(COOKIE_NAME)
  if (rawValue === undefined) {
    return undefined
  }

  try {
    const cookieData: StoredCookieConsentData = JSON.parse(rawValue)
    return cookieData.expires
  } catch (error) {
    console.error("Error parsing cookie consent preferences:", error)
    return undefined
  }
}
