import CookiesStorage from "js-cookie"

import { ConsentStorageManager } from "./manager/ConsentStorageManager"

export class ConsentStorage {
  private readonly consentStorageManager: ConsentStorageManager
  constructor(consentStorageManager: ConsentStorageManager) {
    this.consentStorageManager = consentStorageManager
  }

  setLocalStorageItem(key: string, value: string): void {
    if (!this.consentStorageManager.hasConsentFor(key, "LocalStorage")) {
      console.warn(`Cannot store item to local storage. No consent is given for key ${key}.`)
      return
    }

    localStorage.setItem(key, value)
  }

  getLocalStorageItem(key: string): string | null {
    if (!this.consentStorageManager.hasConsentFor(key, "LocalStorage")) {
      console.warn(`Cannot get item from local storage. No consent is given for key ${key}.`)
      return null
    }
    return localStorage.getItem(key)
  }

  removeLocalStorageItem(key: string): void {
    if (!this.consentStorageManager.hasConsentFor(key, "LocalStorage")) {
      console.warn(`Cannot remove item from local storage. No consent is given for key ${key}.`)
      return
    }
    localStorage.removeItem(key)
  }

  setSessionStorageItem(key: string, value: string): void {
    if (!this.consentStorageManager.hasConsentFor(key, "SessionStorage")) {
      console.warn(`Cannot store item to session storage. No consent is given for key ${key}.`)
      return
    }
    sessionStorage.setItem(key, value)
  }

  getSessionStorageItem(key: string): string | null {
    if (!this.consentStorageManager.hasConsentFor(key, "SessionStorage")) {
      console.warn(`Cannot get item from session storage. No consent is given for key ${key}.`)
      return null
    }
    return sessionStorage.getItem(key)
  }

  removeSessionStorageItem(key: string): void {
    if (!this.consentStorageManager.hasConsentFor(key, "SessionStorage")) {
      console.warn(`Cannot remove item from session storage. No consent is given for key ${key}.`)
      return
    }
    sessionStorage.removeItem(key)
  }

  setCookie(key: string, value: string, options?: Cookies.CookieAttributes | undefined): void {
    if (!this.consentStorageManager.hasConsentFor(key, "Cookie")) {
      console.warn(`Cannot store cookie. No consent is given for key ${key}.`)
      return
    }
    CookiesStorage.set(key, value, options)
  }

  getCookie(key: string): string | null {
    if (!this.consentStorageManager.hasConsentFor(key, "Cookie")) {
      console.warn(`Cannot get cookie. No consent is given for key ${key}.`)
      return null
    }
    const value = CookiesStorage.get(key)
    if (value === undefined) {
      return null
    }
    return value
  }

  removeCookie(key: string, options?: Cookies.CookieAttributes | undefined): void {
    if (!this.consentStorageManager.hasConsentFor(key, "Cookie")) {
      console.warn(`Cannot remove cookie. No consent is given for key ${key}.`)
      return
    }
    CookiesStorage.remove(key, options)
  }
}
