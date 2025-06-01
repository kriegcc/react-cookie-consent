import { useState } from "react"

import { useConsentStorage } from "@/index"

import "./ExampleAnalytics.css"

const EXAMPLE_ANALYTICS_KEY = "example_analytics"

// ConsentStorage checks internally via ConsentManager if consent is given for the specific key
// (i.e. for the category the key belongs to)
// consentStorage.getSessionStorageItem(EXAMPLE_ANALYTICS_KEY)

export function ExampleAnalytics() {
  const { consentStorage } = useConsentStorage()

  const [cookieValue, setCookieValue] = useState<string | null>(
    consentStorage.getLocalStorageItem(EXAMPLE_ANALYTICS_KEY),
  )

  const [inputValue, setInputValue] = useState(cookieValue ?? "")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSave = () => {
    // This will print a warning in console if consent is not given. The key is not stored then.
    consentStorage.setLocalStorageItem(EXAMPLE_ANALYTICS_KEY, inputValue)
    setCookieValue(inputValue)
  }

  const handleClear = () => {
    consentStorage.removeLocalStorageItem(EXAMPLE_ANALYTICS_KEY)
    setCookieValue(null)
    setInputValue("")
  }

  return (
    <div className="example-analytics">
      <h4>Example Analytics:</h4>
      <div className="example-analytics__description">
        Value is stored only in local storage if analytics consent is given.
      </div>
      <div className="example-analytics__controls">
        <div className="example-analytics__stored-value">
          <span className="label">Stored Value:</span>
          {cookieValue !== null && cookieValue !== "" ? (
            <span className="value has-value">{cookieValue}</span>
          ) : (
            <span className="value no-value">No value set</span>
          )}
        </div>
        <div className="example-analytics__form">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Set analytics value"
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleClear}>Clear</button>
        </div>
      </div>
    </div>
  )
}
