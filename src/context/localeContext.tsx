import { ReactNode, createContext, useState } from "react"
import { Locale } from "../hooks/useTranslate"


type LocaleContextValue = {
    locale: Locale
    setLocale: (locale: Locale) => void
}
export const LocaleContext = createContext<LocaleContextValue | null>(null)


export function LocaleContextProvider({ children }: { children: ReactNode }) {

    const [locale, setLocale] = useState<Locale>("en")

    return (
        <LocaleContext.Provider value={{ locale, setLocale }}>
            { children }
        </LocaleContext.Provider>
    )
}