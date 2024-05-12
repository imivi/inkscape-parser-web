import { type SvgElement } from 'inkscape-parser'



export function groupElementsByLayer(elements: SvgElement[]) {
    const elementsByLayer: Record<string, SvgElement[]> = {}

    for(const element of elements) {
        const layer = element.layer
        if(!layer) {
            continue
        }
        if(!elementsByLayer.hasOwnProperty(layer)) {
            elementsByLayer[layer] = []
        }
        elementsByLayer[layer].push(element)
    }
    return elementsByLayer
}
