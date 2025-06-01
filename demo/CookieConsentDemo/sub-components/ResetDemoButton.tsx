import Cookies from "js-cookie"

export function ResetDemoButton() {
  const handleReset = () => {
    resetDemoApp()
  }

  return (
    <button type="button" onClick={handleReset}>
      Reset Demo App
    </button>
  )
}

function resetDemoApp() {
  clearAllCookies()
  localStorage.clear()
  sessionStorage.clear()
  window.location.reload()
}

function clearAllCookies() {
  const allCookies = Cookies.get()
  Object.keys(allCookies).forEach((cookieName) => {
    Cookies.remove(cookieName)
  })
}
