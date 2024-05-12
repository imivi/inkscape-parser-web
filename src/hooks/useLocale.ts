import { useContext } from "react"
import { LocaleContext } from "../context/localeContext"

export function useLocale() {

    const localeContext = useContext(LocaleContext)
    const { locale, setLocale } = localeContext!

    return {
        locale,
        setLocale,
    }
}