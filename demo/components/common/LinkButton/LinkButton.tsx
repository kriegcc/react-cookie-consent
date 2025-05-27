import "./LinkButton.css"

export type LinkButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  href?: string
  className?: string
}

export function LinkButton(props: LinkButtonProps) {
  const { children, onClick, disabled = false, href = "#", className = "" } = props

  if (disabled) {
    return (
      <span className={`link-button disabled ${className}`} aria-disabled="true" tabIndex={-1}>
        {children}
      </span>
    )
  }

  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault()
        onClick?.()
      }}
      className={`link-button ${className}`}
      tabIndex={0}
    >
      {children}
    </a>
  )
}
