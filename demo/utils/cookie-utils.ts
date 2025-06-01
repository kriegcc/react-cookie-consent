import { loadCookies, validateCookiesJsonFile } from "@/index"
import cookiesDeJson from "@demo/data/cookies_de.json"
import cookiesEnJson from "@demo/data/cookies_en.json"
import { Language } from "@demo/types"

const cookiesEnFile = validateCookiesJsonFile(cookiesEnJson) ? cookiesEnJson : { categories: [] }
const cookiesDeFile = validateCookiesJsonFile(cookiesDeJson) ? cookiesDeJson : { categories: [] }

export function getLocalizedCookieCategories(language: Language) {
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
