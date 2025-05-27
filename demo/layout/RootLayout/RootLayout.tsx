import { ReactNode } from "react"

import { Footer } from "@demo/layout/Footer/Footer"
import { Header } from "@demo/layout/Header/Header"

import "./RootLayout.css"

type RootLayoutProps = {
  children: ReactNode
  navigation?: ReactNode
}

export function RootLayout(props: RootLayoutProps) {
  const { children, navigation } = props
  return (
    <section>
      <div className="wrapper">
        <header className="page-header">
          <Header />
          {navigation}
        </header>
        <main className="page-body">
          <div className="page-main-content">{children}</div>
        </main>
        <footer className="page-footer">
          <Footer />
        </footer>
      </div>
    </section>
  )
}
