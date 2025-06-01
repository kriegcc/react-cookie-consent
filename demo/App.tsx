import { useEffect, useState } from "react"

import { CookieConsentProvider } from "@/index"

import { LanguageProvider } from "./contexts/language/LanguageProvider"
import { useLanguage } from "./contexts/language/useLanguage"
import { CookieConsentDemo } from "./CookieConsentDemo/CookieConsentDemo"
import { RootLayout } from "./layout/RootLayout/RootLayout"
import { getLocalizedCookieCategories } from "./utils/cookie-utils"

// main app UI
function App() {
  return (
    <RootLayout>
      <CookieConsentDemo />
    </RootLayout>
  )
}

// wraps main app with the cookie consent provider which supports localization
function AppProviders({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage()
  const [cookieCategories, setCookieCategories] = useState(getLocalizedCookieCategories(language))

  useEffect(() => {
    setCookieCategories(getLocalizedCookieCategories(language))
  }, [language])

  return (
    <CookieConsentProvider initialCookieCategories={cookieCategories}>
      {children}
    </CookieConsentProvider>
  )
}

// wraps everything with all providers (language provider is added)
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
