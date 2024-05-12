import { useState, useEffect, useMemo } from 'react'
import { Button, Modal, Alert, Form } from 'react-bootstrap'
import { Spreadsheet } from "react-spreadsheet"
import { CSVLink } from 'react-csv'
import copySpreadsheetData from '../utils/copySpreadsheetData'
import { FileEarmarkExcel, Clipboard } from 'react-bootstrap-icons'
import { useTranslate } from '../hooks/useTranslate'
import { AlertContent } from '../App'
import { type SvgElement } from 'inkscape-parser'
import { elementsToArray, getNonEmptyColumns } from '../utils/elementsToArray'




type Props = {
    filename: string
    modalData: SvgElement[] | null
    setModalData: (elements: SvgElement[] | null) => void
}

export default function ModalView({ filename, modalData, setModalData }: Props) {

    const [includeEmptyColumns, setIncludeEmptyColumns] = useState(false)
    const [alertContent, setAlertContent] = useState<AlertContent|null>(null)

    const t = useTranslate()

    const handleClose = () => setModalData(null)


    // Get the columns to be displayed
    const columns = useMemo(() => {
        if(!modalData)              return []
        if(modalData.length===0)    return []
        if(includeEmptyColumns)     return Object.keys(modalData[0])
        else                        return getNonEmptyColumns(modalData)
    }, [modalData, includeEmptyColumns])

    // Build the array
    const spreadsheetData = useMemo(() => {
        return modalData ? elementsToArray(modalData, columns) : []
    }, [modalData, columns])

    const csvFilename = `${filename}.csv`

    const csvLinkStyle = {
        color: 'white',
        textDecoration: 'none',
    }

    async function handleCopy() {
        if(!modalData) {
            return
        }
        try {
            await copySpreadsheetData(spreadsheetData.map(row => row.map(cell => cell.value)))
            setAlertContent({
                variant: 'success',
                message: t('alert_data_copied'),
            })
        }
        catch (error) {
            console.error(error)
            setAlertContent({
                variant: 'error',
                message: t('error_copy'),
            })
        }
    }

    // Hide the alert after 2 seconds
    useEffect(() => {
        const timeout = setTimeout(() => {
          setAlertContent(null)
        }, 5000)
      
        return () => clearTimeout(timeout)
    }, [setAlertContent])

    return (
        <Modal show={ modalData!==null } onHide={ handleClose } size='xl' scrollable>
                
            <Modal.Header closeButton>
                <Modal.Title>{ filename }</Modal.Title>
            </Modal.Header>

            <div className='alert-container'>
                <Alert show={ !!alertContent } variant={ alertContent?.variant } onClose={ () => setAlertContent(null) } dismissible>
                    { alertContent?.message }
                </Alert>
            </div>

            <div className='modal-spreadsheet'>
                { modalData && <Spreadsheet data={ spreadsheetData }/> }
            </div>

            <Modal.Footer>

                <Form.Check
                    label="Show empty columns"
                    checked={ includeEmptyColumns }
                    onChange={ () => setIncludeEmptyColumns(!includeEmptyColumns) }
                    id='show-empty-columns'
                />

                <Button variant='success'>
                    <CSVLink
                        // className='icon-download'
                        data={ modalData || [] }
                        filename={ csvFilename }
                        style={ csvLinkStyle }>
                        <FileEarmarkExcel/> { t('btn_save_csv') }
                    </CSVLink>
                </Button>

                <Button variant="primary" onClick={ () => void handleCopy() }>
                    <Clipboard/> { t('btn_copy') }
                </Button>

                <Button variant="secondary" onClick={ handleClose }>
                    { t('btn_close') }
                </Button>

            </Modal.Footer>

        </Modal>
    )
}
