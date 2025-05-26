import CookiesStorage from "js-cookie"

import { StorageLocation } from "../types"

export type ConsentStatusValue = {
  location: StorageLocation
  hasConsent: boolean
}
export type ConsentStatus = Map<string, ConsentStatusValue>

export class ConsentStorageManager {
  private consentStatus: ConsentStatus

  constructor(initialConsentStatus: ConsentStatus) {
    this.consentStatus = initialConsentStatus
  }

  public hasConsentFor(key: string, location: StorageLocation): boolean {
    const consentValue = this.consentStatus.get(key)
    if (
      consentValue !== undefined &&
      consentValue.hasConsent &&
      consentValue.location === location
    ) {
      return true
    }
    return false
  }

  public isKeyKnown(key: string, location: StorageLocation): boolean {
    const consentValue = this.consentStatus.get(key)
    if (consentValue !== undefined && consentValue.location === location) {
      return true
    }
    return false
  }

  public updateConsentStatus(consentStatus: ConsentStatus): void {
    this.consentStatus = consentStatus
    this.handleConsentRevocation()
  }

  private handleConsentRevocation(): void {
    this.consentStatus.forEach((consentValue, key) => {
      if (!consentValue.hasConsent) {
        this.deleteKeyInLocation(key, consentValue.location)
      }
    })
  }

  private deleteKeyInLocation(key: string, location: StorageLocation): void {
    switch (location) {
      case "LocalStorage":
        localStorage.removeItem(key)
        return
      case "SessionStorage":
        sessionStorage.removeItem(key)
        return
      case "Cookie":
        CookiesStorage.remove(key)
        return
      default:
        throw new Error(`Unknown storage location "${location}".`)
    }
  }
}
