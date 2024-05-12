import { Suspense, lazy, useMemo, useState } from 'react'
import { Table } from 'react-bootstrap'
import { Layers, TextareaT, BoundingBoxCircles, ListOl, Question } from 'react-bootstrap-icons'
import { useTranslate } from '../hooks/useTranslate'
import { type SvgElement } from 'inkscape-parser'
import { groupElementsByLayer } from '../utils/groupElementsByLayer'
// import ModalView from './ModalView'

const ModalView = lazy(() => import("../components/ModalView"))




type Props = {
    filename: string
    svgElements: SvgElement[]
}

export default function LayersView({ filename, svgElements }: Props) {

    // Group text & rect elements from all layers
    const allTextElements = useMemo(() => svgElements.filter(element => element.type === "text"), [svgElements])
    const allRectElements = useMemo(() => svgElements.filter(element => element.type === "rect"), [svgElements])

    const elementsByLayer = groupElementsByLayer(svgElements)

    // console.log(elementsByLayer)

    const [modalData, setModalData] = useState<SvgElement[] | null>(null)

    const t = useTranslate()

    return (
        <div className='output-area'>

            <Suspense fallback={null}>
                <ModalView filename={filename} modalData={modalData} setModalData={setModalData} />
            </Suspense>

            <h2>{filename !== "" ? filename + '.svg' : ""}</h2>

            {
                Object.keys(elementsByLayer).length > 0 &&

                <Table className='svg-layers-list'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th><Layers /> {t("layer")}</th>
                            <th><BoundingBoxCircles /> {t("rectangles")}</th>
                            <th><TextareaT /> {t("text")}</th>
                            <th><Question /> {"Any"}</th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* All layers */}
                        <tr>
                            <td>*</td>
                            <td style={{ fontStyle: 'italic' }}>{t('all_layers')}</td>
                            <td>
                                <DownloadButton elements={allRectElements} setModalData={setModalData} />
                            </td>
                            <td>
                                <DownloadButton
                                    elements={allTextElements}
                                    setModalData={setModalData}
                                />
                            </td>
                            <td>
                                <DownloadButton elements={svgElements} setModalData={setModalData} />
                            </td>
                        </tr>

                        {Object.keys(elementsByLayer).map((layer, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{layer}</td>
                                <td>
                                    <DownloadButton
                                        elements={elementsByLayer[layer].filter(element => element.type === "rect")}
                                        setModalData={setModalData}
                                    />
                                </td>
                                <td>
                                    {
                                        <DownloadButton
                                            elements={elementsByLayer[layer].filter(element => element.type === "text")}
                                            setModalData={setModalData}
                                        />
                                    }
                                </td>
                                <td>
                                    {
                                        <DownloadButton
                                            elements={elementsByLayer[layer]}
                                            setModalData={setModalData}
                                        />
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            }

        </div>
    )
}



type DownloadButtonProps = {
    elements: SvgElement[]
    setModalData: (data: SvgElement[] | null) => unknown
}

function DownloadButton({ elements, setModalData }: DownloadButtonProps) {

    if (elements.length === 0) {
        return <span>0</span>
    }

    // const newModalData = rect ? buildCsvRowsRect(elements) : buildCsvRows(elements)

    return (
        <button
            className='icon-download'
            onClick={() => setModalData(elements)}
            data-tip='tooltip'>
            {elements.length}&nbsp;<ListOl />
        </button>
    )
}
