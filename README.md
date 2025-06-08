# React Cookie Consent

Websites operating in the EU or serving EU users are required by [EU data protection laws]([eu-commission-data-protection]) such as the GDPR to obtain valid consent before setting most cookies. Consent must be freely given, specific, informed, and provided through an affirmative action.

**React Cookie Consent** is a flexible, extensible library for managing user cookie consent in React applications.
It aims to help to implement GDPR- and privacy-compliant consent flows.

The library provides classes, utility functions, contexts and hooks for consent management.
The components can be used to build dialogs or modals for cookie consent and handle storing user preferences.
The data structure is extensible and customizable to fit the applications needs.

A basic demo app is included to showcase implementation and demonstrate the library’s usage.

## Usage

Have a look at the [demo app](#demo-app) for a full example of how to integrate the library and how to handle localization.

1. **Define and Provide Cookie Data**

   - Use a JSON file to define your cookie categories.
   - Validate your data with the included utility functions `validateCookiesJsonFile`.

2. **Initialize the Cookie Consent Provider**

   - Get the `CookieCategories` map object from the JSON file via `loadCookies`.
   - Pass `CookieCategories` object to the `CookieConsentProvider`.

3. **Wrap Your App with the Provider**

   - Place the `CookieConsentProvider` at the root of your React application.
   - This gives all child components access to the consent context, functions, and hooks.

4. **Implement the Consent Flow**

   - Use the provided hooks and functions to build a cookie consent banner, modal, or dialog.
   - Allow users to accept, reject, or customize their consent.

5. **Store Data Accordingly**
   - When storing data in cookies, localStorage, or sessionStorage, use the `useConsentStorage` hook.
   - This ensures that data is only stored according to the user’s consent preferences.

### Initialization Example

```tsx
import { CookieConsentProvider, loadCookies, validateCookiesJsonFile } from "react-cookie-consent"
import cookiesJson from "./data/cookies.json"

const cookiesFile = validateCookiesJsonFile(cookiesJson) ? cookiesJson : { categories: [] }
const cookieCategories = loadCookies(cookiesFile)

<CookieConsentProvider initialCookieCategories={cookieCategories}>
  <App />
</CookieConsentProvider>
```

For a complete example, see the [demo app](#demo-app).

## Build and Run the Demo App

### Perquisites

This library uses the following tools for development and build:

- [Node.js](https://nodejs.org)
- [pnpm](https://pnpm.io/)
- [Vite](https://vite.dev/)
- [ESLint](https://eslint.org)
- [Prettier](https://prettier.io)

### Install Dependencies

The project has some Node _Dependencies_ which are required for the development and build process. They are listed in the `package.json` file.

Run the install command in the project's root folder to install the required dependencies.

```sh
pnpm i
```

### Build

The build command runs Vite, which uses the TypeScript compiler to compile the source files. Vite then optimizes and bundles the compiled code, placing the final output in the `dist` folder. The library is then ready for consumption or distribution.

```sh
pnpm build
```

### Demo App

The library includes a basic React demo app that showcases how to use the cookie consent library.
The demo script command starts the Vite development server and hosts the app locally. By default, the browser will open automatically.
The demo app is served at http://localhost:3000/.

```sh
pnpm demo
```

### Tests

The test command runs the library’s unit tests.

```sh
pnpm test
```

### ESLint and Prettier

[ESLint](https://eslint.org) and [Prettier](https://prettier.io) help maintain a high coding standard.

There are two script commands to ensure that the code adheres to the project's coding standards. Run the following commands to check for style violations:

**ESLint:**

```sh
pnpm lint
pnpm lint-fix
```

**Prettier:**

```sh
pnpm format
pnpm format-fix
```

Ideally, an IDE should automatically read the ESLint and Prettier configurations and provide direct feedback while writing code.

## Version and Changelog

The project uses [Semantic Versioning](http://semver.org/).

A changelog is available here: [Changelog][changelog]

## License

[MIT](https://spdx.org/licenses/MIT.html)

See: [License][license]

[eu-commission-data-protection]: https://commission.europa.eu/law/law-topic/data-protection_en
[changelog]: CHANGELOG.md
[license]: LICENSE
