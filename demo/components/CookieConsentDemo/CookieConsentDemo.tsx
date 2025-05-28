import { CookieCategory, useCookieConsent } from "@/index"
import { useLanguage } from "@demo/contexts/useLanguage"
import { Language, languages } from "@demo/types"

import "./CookieConsentDemo.css"

export function CookieConsentDemo() {
  const { language, setLanguage } = useLanguage()

  const { cookieCategories, toggleCategoryIsEnable, giveConsent } = useCookieConsent()
  return (
    <div className="cookie-consent-demo">
      <h2>Cookie Consent Demo</h2>
      <AdvertisementDemo />
      <AnalyticsDemo />
      <h3>Consent Status:</h3>
      <ConsentStatus />
      <h3>Settings:</h3>
      <label htmlFor="language">Language</label>
      <select
        id="language"
        value={language}
        onChange={(event) => setLanguage(event.target.value as Language)}
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
      <br />
      <span>
        Consent Choice
        <button onClick={() => giveConsent("ACCEPT_ALL")}>Accept All</button>
        <button onClick={() => giveConsent("REJECT_ALL")}>Reject All</button>
        <button onClick={() => giveConsent("CUSTOMIZE")}>Custom</button>
      </span>
      <br />
      <span>
        Category Selection
        {Array.from(cookieCategories.entries()).map(([categoryId, category]) => (
          <span key={categoryId}>
            <br />
            <label>
              {categoryId}
              <button
                disabled={category.isMandatory}
                onClick={() => toggleCategoryIsEnable(categoryId)}
              >
                {category.isMandatory ? "Always On" : category.isEnabled ? "On" : "Off"}
              </button>
            </label>
          </span>
        ))}
      </span>
      <h3>Category IDs:</h3>
      <ul>
        {Array.from(cookieCategories.keys()).map((categoryId) => (
          <li key={categoryId}>{categoryId}</li>
        ))}
      </ul>
      <h3>Category Details:</h3>
      <div className="category-details-container">
        {Array.from(cookieCategories.entries()).map(([categoryId, category]) => (
          <div key={categoryId} className="category-details-container__single-category">
            <span>
              <button
                className={`category-toggle${category.isEnabled === true ? " on" : " off"}`}
                type="button"
                role="button"
                disabled={category.isMandatory}
                onClick={() => toggleCategoryIsEnable(categoryId)}
                title={`${category.isMandatory === true ? "Category is mandatory and cannot be disabled." : category.isEnabled === true ? "Disable category" : "Enable category"}`}
              >
                {category.isMandatory ? "Always On" : category.isEnabled ? "On" : "Off"}
              </button>
            </span>
            <CookieCategoryDetail category={category} />
          </div>
        ))}
      </div>
    </div>
  )
}

type CookieCategoryDetailProps = {
  category: CookieCategory
}

function CookieCategoryDetail(props: CookieCategoryDetailProps) {
  const { category } = props
  return (
    <table className="category-details">
      <tbody>
        <tr>
          <th>ID:</th>
          <td>{category.id}</td>
        </tr>
        <tr>
          <th>Title:</th>
          <td>{category.title}</td>
        </tr>
        <tr>
          <th>Description:</th>
          <td>{category.description}</td>
        </tr>
        <tr>
          <th>isEnabled:</th>
          <td>{category.isEnabled ? "Yes" : "No"}</td>
        </tr>
        <tr>
          <th>isMandatory:</th>
          <td>{category.isMandatory ? "Yes" : "No"}</td>
        </tr>
        <tr>
          <th>Cookies:</th>
          <td>
            {category.cookies.length > 0 ? (
              <table className="cookie-details">
                <thead>
                  <tr>
                    <th scope="col">Key:</th>
                    <th scope="col">Location:</th>
                    <th scope="col">Duration:</th>
                    <th scope="col">Description:</th>
                  </tr>
                </thead>
                <tbody>
                  {category.cookies.map((cookie) => (
                    <tr key={cookie.key}>
                      <td>{cookie.key}</td>
                      <td>{cookie.location}</td>
                      <td>{cookie.duration}</td>
                      <td>{cookie.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              "None"
            )}
          </td>
        </tr>
      </tbody>
    </table>
  )
}

function AdvertisementDemo() {
  const { isCookieCategoryIdConsensual } = useCookieConsent()
  const showAd = isCookieCategoryIdConsensual("advertisement")

  if (!showAd) {
    return (
      <div style={{ padding: "1rem", background: "#eee", margin: "1rem 0" }}>
        <strong>Ad Blocked</strong>: You have not consented to advertisement cookies.
      </div>
    )
  }

  return (
    <div style={{ padding: "1rem", background: "#ffe0b2", margin: "1rem 0" }}>
      <strong>Sponsored Ad:</strong> Buy the best cookies online!
    </div>
  )
}

function AnalyticsDemo() {
  const { isCookieCategoryIdConsensual } = useCookieConsent()

  const showAnalytics = isCookieCategoryIdConsensual("analytics")

  if (!showAnalytics) {
    return (
      <div style={{ padding: "1rem", background: "#f0f0f0", margin: "1rem 0", color: "#666" }}>
        <strong>Analytics Disabled</strong>: You have not consented to analytics cookies.
      </div>
    )
  }

  return (
    <div style={{ padding: "1rem", background: "#cce5ff", margin: "1rem 0" }}>
      <strong>Analytics Dashboard:</strong> Showing anonymized user data and metrics.
    </div>
  )
}

function ConsentStatus() {
  const { cookieConsentDetails } = useCookieConsent()

  if (!cookieConsentDetails) {
    return (
      <div style={{ padding: "1rem", background: "#ffe0e0", margin: "1rem 0" }}>
        <strong>No consent decision has been made yet.</strong>
      </div>
    )
  }

  const { choice, choiceDate, enabledCategories, cookieExpirationDate } = cookieConsentDetails

  return (
    <div style={{ padding: "1rem", background: "#e8f5e9", margin: "1rem 0" }}>
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
