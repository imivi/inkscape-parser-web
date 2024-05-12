import { Translation, translations } from "../translations"
import { useLocale } from "./useLocale"


export function useTranslate() {

    const { locale } = useLocale()
    
    function translate(key: keyof Translation) {
        return translations[locale][key]
    }
    return translate
}