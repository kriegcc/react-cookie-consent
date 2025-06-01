import "./Footer.css"

export function Footer() {
  return (
    <div className="footer">
      <nav>
        <ul>
          <li>
            <a
              href="https://github.com/kriegcc/react-cookie-consent"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </li>
        </ul>
      </nav>
      <div className="footer__credit">Copyright &copy; {new Date().getFullYear()} kriegcc</div>
    </div>
  )
}
