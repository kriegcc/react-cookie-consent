import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"

import App from "@demo/App"

describe("App Component", () => {
  it("should render the demo app", () => {
    render(<App />)
    const title = screen.getByText("React-Cookie-Consent")
    expect(title).toBeInTheDocument()
  })
})
