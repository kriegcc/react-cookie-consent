import "./Header.css"

export function Header() {
  return (
    <div className="header">
      <div className="header__icon">
        <img src="/cookie.svg" alt="Cookie Icon" height="40" width="40" />
      </div>
      <div className="header__title">React-Cookie-Consent</div>
    </div>
  )
}
