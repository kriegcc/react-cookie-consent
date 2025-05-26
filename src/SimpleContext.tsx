import { createContext, useContext, useState, ReactNode } from "react"

type SimpleContextType = {
  value: string
  setValue: (value: string) => void
}

const SimpleContext = createContext<SimpleContextType>({
  value: "",
  setValue: () => {
    /* no-op */
  },
})

export const SimpleProvider = ({ children }: { children: ReactNode }) => {
  const [value, setValue] = useState<string>("initial value")
  return <SimpleContext.Provider value={{ value, setValue }}>{children}</SimpleContext.Provider>
}

export const useSimpleContext = () => useContext(SimpleContext)
