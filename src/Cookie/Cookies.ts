import { StorageLocation } from "@/ConsentStorage/types"

export type CookieStorage = StorageLocation
export type CookieCategoryId = "necessary" | "functional" | "analytics" | "advertisement"
export type CookieCategories = Map<CookieCategoryId, CookieCategory>
export class Cookie {
  key: string
  description: string
  location: CookieStorage
  duration: string

  constructor(key: string, description: string, location: CookieStorage, duration: string) {
    this.key = key
    this.description = description
    this.location = location
    this.duration = duration
  }

  clone(): Cookie {
    return new Cookie(this.key, this.description, this.location, this.duration)
  }
}

export class CookieCategory {
  id: CookieCategoryId
  title: string
  description: string
  isEnabled: boolean
  isMandatory: boolean
  cookies: Cookie[]

  constructor(id: CookieCategoryId, title: string, description: string, isMandatory = false) {
    this.id = id
    this.title = title
    this.description = description
    this.isMandatory = isMandatory
    this.isEnabled = isMandatory // Mandatory categories are always enabled
    this.cookies = []
  }

  addCookie(cookie: Cookie): void {
    this.cookies.push(cookie)
  }

  toggleIsEnabled(): void {
    if (this.isMandatory) {
      console.warn("This cookie category is mandatory. It cannot be disabled.")
      return
    }
    this.isEnabled = !this.isEnabled
  }

  enable(): void {
    this.isEnabled = true
  }

  disable(): void {
    if (this.isMandatory) {
      console.warn("This cookie category is mandatory. It cannot be disabled.")
      return
    }
    this.isEnabled = false
  }

  clone(): CookieCategory {
    const cookieCategory = new CookieCategory(
      this.id,
      this.title,
      this.description,
      this.isMandatory,
    )
    cookieCategory.isEnabled = this.isEnabled
    // need to deep copy cookies array as well
    cookieCategory.cookies = this.cookies.map((cookie) => cookie.clone())
    return cookieCategory
  }
}

// "value is CookieCategoryId" is a "type predicate":
// It tells TypeScript that the argument value can safely be treated as a CookieCategoryId type if the function return "true".
export function isCookieCategoryId(value: string): value is CookieCategoryId {
  return ["necessary", "functional", "analytics", "advertisement"].includes(value)
}

export function isCookieStorage(value: string): value is CookieStorage {
  return ["Cookie", "LocalStorage", "SessionStorage", "Cache"].includes(value)
}
