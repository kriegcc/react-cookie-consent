import { useEffect, useState } from "react"

import { CookieConsentProvider, loadCookies, validateCookiesJsonFile } from "@/index"
import cookiesDeJson from "@demo/data/cookies_de.json"
import cookiesEnJson from "@demo/data/cookies_en.json"

import { CookieConsentDemo } from "./components/CookieConsentDemo/CookieConsentDemo"
import { LanguageProvider } from "./contexts/LanguageProvider"
import { useLanguage } from "./contexts/useLanguage"
import { Navigation } from "./layout/Navigation/Navigation"
import { RootLayout } from "./layout/RootLayout/RootLayout"
import { Language, Page } from "./types"

const cookiesEnFile = validateCookiesJsonFile(cookiesEnJson) ? cookiesEnJson : { categories: [] }
const cookiesDeFile = validateCookiesJsonFile(cookiesDeJson) ? cookiesDeJson : { categories: [] }

// main application UI
function App() {
  const [page, setPage] = useState<Page>(Page.Home)

  return (
    <RootLayout navigation={<Navigation currentPage={page} onNavigate={setPage} />}>
      {/* {page === "home" && <Home />}
      {page === "second" && <Second />} */}
      <CookieConsentDemo />
    </RootLayout>
  )
}

function AppProviders({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage()

  const [cookieCategories, setCookieCategories] = useState(getTranslatedCookieData(language))

  useEffect(() => {
    setCookieCategories(getTranslatedCookieData(language))
  }, [language])

  return (
    <CookieConsentProvider initialCookieCategories={cookieCategories}>
      {children}
    </CookieConsentProvider>
  )
}

// wraps everything with all providers
function RootApp() {
  return (
    <LanguageProvider>
      <AppProviders>
        <App />
      </AppProviders>
    </LanguageProvider>
  )
}

export default RootApp

function getTranslatedCookieData(language: Language) {
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
