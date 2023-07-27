import { useRef, useState, useEffect, ChangeEvent } from 'react'
import HeaderPicture from './components/HeaderPicture'
import Footer from './components/Footer'
import { Form } from 'react-bootstrap'
import LayersView from './components/LayersView'
import Alert from 'react-bootstrap/Alert'
import LanguageSwitcher from './components/LanguageSwitcher'
import { useTranslate } from './hooks/useTranslate'
import { parseInkscape, type SvgElement } from 'inkscape-parser'


export type AlertContent = {
    message: string
    variant: string
}

export default function App() {

    const [filename, setFilename] = useState("")
    const [svgElements, setSvgElements] = useState<SvgElement[]>([])
    const [showAlert, setShowAlert] = useState(false)
    const [alertContent, setAlertContent] = useState<AlertContent>({ message: '', variant: "success" })

    const inputRef = useRef<HTMLInputElement>(null)

    const t = useTranslate()

    function handleFileUploaded(event: ChangeEvent<HTMLInputElement>) {
        const files = event.target.files
        // console.log('Uploaded files:', files)

        if(!files) {
            return
        }

        const fileToLoad = files[0]

        // Check the extension is valid
        const extension = fileToLoad.name.split('.').slice(-1)[0]
        if(extension.toLowerCase() !== 'svg') {
            setShowAlert(true)
            setAlertContent({
                variant: 'danger',
                message: t('alert_error_filetype')+fileToLoad.name,
            })
            return
        }

        // Get the filename of the uploaded txt (and remove the extension)
        const txtFilename = fileToLoad.name.split('.').slice(0,-1).join('.')
        setFilename(txtFilename)

        const fileReader = new FileReader();
        fileReader.onload = (fileLoadedEvent) => {
            if(fileLoadedEvent.target) {
                const textFromFileLoaded = fileLoadedEvent.target.result?.toString()
                if(textFromFileLoaded) {
                    const { elements } = parseInkscape(textFromFileLoaded)

                    // Sort by layer
                    setSvgElements(elements.sort((a,b) => {
                        if(a.layer && b.layer) return a.layer < b.layer ? -1 : 1
                        return 0
                    }))
                }
            }
        }

        fileReader.readAsText(fileToLoad, "UTF-8");
        if(inputRef.current) {
            inputRef.current.value = ""
        }

        setShowAlert(true)
        setAlertContent({
            variant: 'success',
            message: t('alert_upload_successful')+fileToLoad.name,
        })
    }

    // Hide the alert after 2 seconds
    useEffect(() => {
        const timeout = setTimeout(() => {
          setShowAlert(false)
        }, 5000);
      
        return () => clearTimeout(timeout);
      }, [showAlert]);
      
  
    return (<>
        
        <div className='layout'>

            <div className='alert-container'>
                <Alert show={ showAlert } variant={ alertContent.variant } onClose={ () => setShowAlert(false) } dismissible>
                    { alertContent.message }
                </Alert>
            </div>

            <LanguageSwitcher/>

            <div className='main-area'>

                <HeaderPicture/>
                
                <div className='controls'>

                    {/* <h1>SVG parser</h1> */}

                    <p>
                        <Form.Control
                            type="file"
                            onInput={ handleFileUploaded }
                            ref={ inputRef }
                        />
                    </p>

                </div>

            </div>

            <LayersView filename={ filename } svgElements={ svgElements }/>

        </div>

        <Footer/>
    </>);
}
