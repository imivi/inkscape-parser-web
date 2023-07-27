type Cell = {
    value: string
}

export function elementsToArray(objects: Record<string,number|string|null>[], includeEmptyColumns: boolean): Cell[][] {

    // Make sure there's at least one row
    if(objects.length === 0) {
        return []
    }

    // Gather all possible columns
    const keysSet = new Set<string>()
    for(const object of objects) {
        for(const key of Object.keys(object)) {
            if(includeEmptyColumns || object[key]) {
                keysSet.add(key)
            }
        }
    }
    // objects.forEach(obj => {
    //     Object.keys(obj).forEach(key => keysSet.add(key))
    // })
    const keys = Array.from(keysSet)

    const rows = objects.map(obj => {
        const row = []
        for(const key of keys) {
            const value = obj[key]
            row.push({
                value: value ? value.toString() : "",
            })
        }
        return row
    })

    return [
        keys.map(key => ({ value: key })),
        ...rows,
    ]
}
