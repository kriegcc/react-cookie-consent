import { LinkButton } from "@demo/components/common/LinkButton/LinkButton"
import { Page } from "@demo/types"

import "./Navigation.css"

export type NavigationProps = {
  currentPage: Page
  onNavigate: (page: Page) => void
}

export function Navigation(props: NavigationProps) {
  const { currentPage, onNavigate } = props

  return (
    <div className="navigation">
      <nav>
        <ul>
          <li>
            <LinkButton onClick={() => onNavigate(Page.Home)} disabled={currentPage === Page.Home}>
              Home
            </LinkButton>
          </li>
          <li>
            <LinkButton
              onClick={() => onNavigate(Page.Second)}
              disabled={currentPage === Page.Second}
            >
              Second
            </LinkButton>
          </li>
        </ul>
      </nav>
    </div>
  )
}
