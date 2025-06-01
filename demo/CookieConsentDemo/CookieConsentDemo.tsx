import { ConsentChoiceEffects } from "./sub-components/ConsentChoiceEffects"
import { ConsentControls } from "./sub-components/ConsentControls"
import { ConsentStatus } from "./sub-components/ConsentStatus"
import CookieCategoriesDetails from "./sub-components/CookieCategoryDetails"
import { ResetDemoButton } from "./sub-components/ResetDemoButton"

import "./CookieConsentDemo.css"

export function CookieConsentDemo() {
  return (
    <div className="cookie-consent-demo">
      <h2 className="cookie-consent-demo__title">Demo App</h2>
      <div className="cookie-consent-demo_reset-button">
        <ResetDemoButton />
      </div>
      <ConsentStatus />
      <ConsentControls />
      <ConsentChoiceEffects />
      <CookieCategoriesDetails />
    </div>
  )
}
