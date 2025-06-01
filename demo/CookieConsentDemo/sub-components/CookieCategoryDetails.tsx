import { CookieCategory, useCookieConsent } from "@/index"

import "./CookieCategoryDetails.css"

export default function CookieCategoryDetails() {
  const { cookieCategories } = useCookieConsent()
  return (
    <div className="consent-category-details">
      <h3>Category Details</h3>
      <div className="consent-category-details-container">
        {Array.from(cookieCategories.entries()).map(([categoryId, category]) => (
          <div key={categoryId} className="consent-category-details-container__single-category">
            <IndividualCookieCategoryDetails category={category} />
          </div>
        ))}
      </div>
    </div>
  )
}

type IndividualCookieCategoryDetailsProps = {
  category: CookieCategory
}

function IndividualCookieCategoryDetails(props: IndividualCookieCategoryDetailsProps) {
  const { category } = props
  return (
    <table className="individual-category-details">
      <tbody>
        <tr>
          <th scope="row">ID:</th>
          <td>{category.id}</td>
        </tr>
        <tr>
          <th scope="row">Title:</th>
          <td>{category.title}</td>
        </tr>
        <tr>
          <th scope="row">Description:</th>
          <td>{category.description}</td>
        </tr>
        <tr>
          <th scope="row">isEnabled:</th>
          <td>{category.isEnabled ? "Yes" : "No"}</td>
        </tr>
        <tr>
          <th scope="row">isMandatory:</th>
          <td>{category.isMandatory ? "Yes" : "No"}</td>
        </tr>
        <tr>
          <th>Cookies:</th>
          <td>
            {category.cookies.length > 0 ? (
              <table className="individual-category-details_cookie-details">
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
