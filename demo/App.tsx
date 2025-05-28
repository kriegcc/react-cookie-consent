import { useState } from "react"

import { CookieConsentProvider } from "@/index"

import { CookieConsentDemo } from "./components/CookieConsentDemo/CookieConsentDemo"
import { LanguageProvider } from "./contexts/LanguageProvider"
import { useLanguage } from "./contexts/useLanguage"
import { Navigation } from "./layout/Navigation/Navigation"
import { RootLayout } from "./layout/RootLayout/RootLayout"
import { Page } from "./types"

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
  return <CookieConsentProvider language={language}>{children}</CookieConsentProvider>
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
