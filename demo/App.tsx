import { useState } from "react"

import { Navigation } from "./layout/Navigation/Navigation"
import { RootLayout } from "./layout/RootLayout/RootLayout"
import { Home } from "./pages/Home/Home"
import { Second } from "./pages/Second/Second"
import { Page } from "./types"

function App() {
  const [page, setPage] = useState<Page>(Page.Home)

  return (
    <RootLayout navigation={<Navigation currentPage={page} onNavigate={setPage} />}>
      {page === "home" && <Home />}
      {page === "second" && <Second />}
    </RootLayout>
  )
}

export default App
