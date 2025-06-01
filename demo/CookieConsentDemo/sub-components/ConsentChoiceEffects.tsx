import { useCookieConsent } from "@/index"

import { ExampleAnalytics } from "./ExampleAnalytics"

import "./ConsentChoiceEffects.css"

export function ConsentChoiceEffects() {
  return (
    <span className="consent-choice-effects">
      <h3>Cookie Consent Choice Effects</h3>
      <AdvertisementDemo />
      <AnalyticsDemo />
      <ExampleAnalytics />
    </span>
  )
}

function AdvertisementDemo() {
  const { isCookieCategoryIdConsensual } = useCookieConsent()
  const showAd = isCookieCategoryIdConsensual("advertisement")

  if (!showAd) {
    return (
      <div className="effect-element disabled">
        <strong>Ad Blocked:</strong> You have not consented to advertisement cookies.
      </div>
    )
  }

  return (
    <div className="effect-element enabled">
      <strong>Ad Enabled:</strong> Some advertisement can be displayed here.
    </div>
  )
}

function AnalyticsDemo() {
  const { isCookieCategoryIdConsensual } = useCookieConsent()
  const showAnalytics = isCookieCategoryIdConsensual("analytics")

  if (!showAnalytics) {
    return (
      <div className="effect-element disabled">
        <strong>Analytics Disabled:</strong> You have not consented to analytics cookies.
      </div>
    )
  }

  return (
    <div className="effect-element enabled">
      <strong>Analytics Enabled:</strong> Anonymized user data and metrics can be processed.
    </div>
  )
}
