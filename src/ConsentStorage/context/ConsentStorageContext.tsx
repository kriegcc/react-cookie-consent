import { createContext } from "react"

import { ConsentStorage } from "../ConsentStorage"

export type ConsentStorageContextProps = {
  consentStorage: ConsentStorage
}

export const ConsentStorageContext = createContext<ConsentStorageContextProps | undefined>(
  undefined,
)
