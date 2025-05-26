import {
  Cookie,
  CookieCategories,
  CookieCategory,
  CookieCategoryId,
  CookieStorage,
  isCookieCategoryId,
  isCookieStorage,
} from "@/Cookie/Cookies"
import cookiesDeJson from "@/data/cookies_de.json"
import cookiesEnJson from "@/data/cookies_en.json"
import { Language } from "@/types"

type CookieData = {
  key: string
  description: string
  location: CookieStorage
  duration: string
}

type CookieCategoryData = {
  id: CookieCategoryId
  title: string
  description: string
  isMandatory: boolean
  cookies: CookieData[]
}

type CookiesFile = {
  categories: CookieCategoryData[]
}

// Validation function to check if the imported json conforms to the CookiesFile type
// TypeScript treats the imported data as any type because it is not able to infer the structure of the JSON data at compile time
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function validateCookiesJsonFile(data: any): data is CookiesFile {
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

function loadCookies(cookiesFile: CookiesFile): CookieCategories {
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

const cookiesEnFile = validateCookiesJsonFile(cookiesEnJson) ? cookiesEnJson : { categories: [] }
const cookiesDeFile = validateCookiesJsonFile(cookiesDeJson) ? cookiesDeJson : { categories: [] }

export function getTranslatedCookieData(language: Language) {
  switch (language) {
    case Language.English:
      return loadCookies(cookiesEnFile)
    case Language.German:
      return loadCookies(cookiesDeFile)
    default:
      console.warn(`No cookie translations for "${language}" available.`)
      // return English as fallback
      return loadCookies(cookiesEnFile)
  }
}
