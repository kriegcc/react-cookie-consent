import { Fragment } from "react/jsx-runtime"

import { useCookieConsent } from "@/index"
import { useLanguage } from "@demo/contexts/language/useLanguage"
import { Language, languages } from "@demo/types"

import "./ConsentControls.css"

export function ConsentControls() {
  const { language, setLanguage } = useLanguage()
  const { cookieCategories, toggleCategoryIsEnable, giveConsent, cookieConsentDetails } =
    useCookieConsent()

  return (
    <div className="consent-controls">
      <h3>Cookie Consent Controls</h3>
      <div className="consent-controls-content">
        <label htmlFor="consent-controls_language" className="consent-controls-content__label">
          Language
        </label>
        <select
          id="consent-controls_language"
          className="consent-controls-content__control"
          value={language}
          onChange={(event) => setLanguage(event.target.value as Language)}
        >
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.name}
            </option>
          ))}
        </select>
        <label
          htmlFor="consent-controls_consent-choice"
          className="consent-controls-content__label"
        >
          Consent Choice
        </label>
        <div
          id="consent-controls_consent-choice"
          className="consent-controls-content__control-container"
        >
          <button
            onClick={() => giveConsent("ACCEPT_ALL")}
            disabled={cookieConsentDetails?.choice === "ACCEPT_ALL"}
          >
            Accept All
          </button>
          <button
            onClick={() => giveConsent("REJECT_ALL")}
            disabled={cookieConsentDetails?.choice === "REJECT_ALL"}
          >
            Reject All
          </button>
          <button
            onClick={() => giveConsent("CUSTOMIZE")}
            disabled={cookieConsentDetails?.choice === "CUSTOMIZE"}
          >
            Custom
          </button>
        </div>
        <label className="consent-controls-content__label">Category Selection</label>
        <div className="consent-controls-content__control"></div>
        {cookieConsentDetails?.choice === "CUSTOMIZE" &&
          Array.from(cookieCategories.entries()).map(([categoryId, category]) => (
            <Fragment key={categoryId}>
              <label
                htmlFor={`consent-controls-category-selection-${categoryId}`}
                className="consent-controls-content__label indented"
              >
                {categoryId}
              </label>
              <button
                id={`consent-controls-category-selection-${categoryId}`}
                className="consent-controls-content__control"
                disabled={category.isMandatory}
                onClick={() => toggleCategoryIsEnable(categoryId)}
              >
                {category.isMandatory ? "Always On" : category.isEnabled ? "On" : "Off"}
              </button>
            </Fragment>
          ))}
      </div>
      {/* TODO: maybe enforce this in provider. */}
      {cookieConsentDetails?.choice !== "CUSTOMIZE" && (
        <div className="consent-controls-content__hint">
          Individual category selection works only for the "custom" consent choice.
        </div>
      )}
    </div>
  )
}
