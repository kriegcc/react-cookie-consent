import {
  Cookie,
  CookieCategories,
  CookieCategory,
  CookieCategoryId,
  CookieStorage,
  isCookieCategoryId,
  isCookieStorage,
} from "@/Cookie/Cookies"

export type CookieData = {
  key: string
  description: string
  location: CookieStorage
  duration: string
}

export type CookieCategoryData = {
  id: CookieCategoryId
  title: string
  description: string
  isMandatory: boolean
  cookies: CookieData[]
}

export type CookiesFile = {
  categories: CookieCategoryData[]
}

// Validation function to check if the imported json conforms to the CookiesFile type
// TypeScript treats the imported data as any type because it is not able to infer the structure of the JSON data at compile time
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateCookiesJsonFile(data: any): data is CookiesFile {
  if (!Array.isArray(data.categories)) {
    return false
  }
  for (const category of data.categories) {
    if (
      !isCookieCategoryId(category.id) ||
      typeof category.title !== "string" ||
      typeof category.description !== "string" ||
      typeof category.isMandatory !== "boolean" ||
      !Array.isArray(category.cookies)
    ) {
      return false
    }
    for (const cookie of category.cookies) {
      if (
        typeof cookie.key !== "string" ||
        typeof cookie.description !== "string" ||
        !isCookieStorage(cookie.location) ||
        typeof cookie.duration !== "string"
      ) {
        return false
      }
    }
  }
  return true
}

export function loadCookies(cookiesFile: CookiesFile): CookieCategories {
  const categories: CookieCategories = new Map<CookieCategoryId, CookieCategory>()

  cookiesFile.categories.map((categoryData: CookieCategoryData) => {
    const category = new CookieCategory(
      categoryData.id,
      categoryData.title,
      categoryData.description,
      categoryData.isMandatory,
    )
    categoryData.cookies.forEach((cookieData: CookieData) => {
      const cookie = new Cookie(
        cookieData.key,
        cookieData.description,
        cookieData.location,
        cookieData.duration,
      )
      category.addCookie(cookie)
    })
    categories.set(category.id, category)
  })

  return categories
}
