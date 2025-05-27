import { LinkButton } from "@demo/components/common/LinkButton/LinkButton"
import "./Footer.css"

export function Footer() {
  const handleCookieSettingsClick = () => {
    console.log("--> click handleCookieSettingsClick")
  }

  return (
    <div className="footer">
      <nav>
        <ul>
          <li>
            <LinkButton onClick={handleCookieSettingsClick}>Cookie Notice</LinkButton>
          </li>
        </ul>
      </nav>
    </div>
  )
}
