import Form from 'react-bootstrap/Form'
import { useLocale } from '../hooks/useLocale'
import { Locale } from '../translations'


export default function LanguageSwitcher() {

    const { locale, setLocale } = useLocale()

    const languageLabels: Record<string,string> = {
        'en': 'English',
        'it': 'Italiano',
    }


    return (
        <div className='language-switcher'>
            <Form.Select
                size="sm"
                onChange={ (e) => setLocale(e.target.value as Locale) }
                value={ locale }
            >
            {
                ["en","it"].map(lan => (
                    <option value={lan} key={lan}>
                        { languageLabels[lan] || lan.toUpperCase() }
                    </option>
                ))
            }
            </Form.Select>
        </div>
    )
}