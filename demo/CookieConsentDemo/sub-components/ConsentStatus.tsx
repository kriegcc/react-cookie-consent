import { useCookieConsent } from "@/index"

import "./ConsentStatus.css"

export function ConsentStatus() {
  return (
    <span className="consent-status">
      <h3>Cookie Consent Status</h3>
      <ConsentStatusDetails />
    </span>
  )
}

function ConsentStatusDetails() {
  const { cookieConsentDetails } = useCookieConsent()

  if (!cookieConsentDetails) {
    return (
      <div className="consent-status-content none">
        <strong>No consent decision has been made yet.</strong>
      </div>
    )
  }

  const { choice, choiceDate, enabledCategories, cookieExpirationDate } = cookieConsentDetails

  return (
    <div className="consent-status-content set">
      <ul>
        <li>
          <strong>Choice:</strong> {choice}
        </li>
        <li>
          <strong>Date:</strong> {new Date(choiceDate).toLocaleString()}
        </li>
        <li>
          <strong>Enabled Categories:</strong>{" "}
          {enabledCategories.length > 0 ? enabledCategories.join(", ") : <em>None</em>}
        </li>
        <li>
          <strong>Consent Expires:</strong> {cookieExpirationDate}
        </li>
      </ul>
    </div>
  )
}
