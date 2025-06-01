import { ReactNode } from "react"

import { Footer } from "@demo/layout/RootLayout/Footer/Footer"
import { Header } from "@demo/layout/RootLayout/Header/Header"

import "./RootLayout.css"

type RootLayoutProps = {
  children: ReactNode
}

export function RootLayout(props: RootLayoutProps) {
  const { children } = props
  return (
    <section>
      <div className="wrapper">
        <header className="page-header">
          <Header />
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
