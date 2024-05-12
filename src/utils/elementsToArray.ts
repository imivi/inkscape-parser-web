type Cell = {
    value: string
}


export function getNonEmptyColumns(objects: Record<string,number|string|null>[]): string[] {

    // Gather all possible columns
    const nonEmptyColumns = new Set<string>()
    
    for(const object of objects) {
        for(const key of Object.keys(object)) {
            if(object[key]) {
                nonEmptyColumns.add(key)
            }
        }
    }
    
    return Array.from(nonEmptyColumns)
}

export function elementsToArray(objects: Record<string,number|string|null>[], columns: string[]): Cell[][] {

    // Make sure there's at least one row
    if(objects.length === 0) {
        return []
    }

    const rows = objects.map(obj => {
        const row = []
        for(const key of columns) {
            const value = obj[key]
            row.push({
                value: value ? value.toString() : "",
            })
        }
        return row
    })

    return [
        columns.map(key => ({ value: key })),
        ...rows,
    ]
}
