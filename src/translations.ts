const translationKeys = [
    "all_layers",
    "layer",
    "text",
    "rectangles",
    "save_csv",
    "copy_table",
    "close",
    "alert_error_filetype",
    "alert_data_copied",
    "btn_save_csv",
    "btn_copy",
    "btn_close",
    "alert_upload_successful",
    "error_copy",
] as const

export type Translation = Record<typeof translationKeys[number], string>

export type Translations = {
    en: Translation
    it: Translation
}
export type Locale = keyof Translations


export const translations: Translations = {
    en: {
        all_layers: "All layers",
        layer: "Layer",
        rectangles: "Rectangles",
        text: "Text",
        copy_table: "Copy table",
        save_csv: "Download CSV",
        close: "Close",
        alert_error_filetype: "Unsupported format",
        alert_data_copied: "Data copied",
        btn_save_csv: "Save as CSV",
        btn_copy: "Copy",
        btn_close: "Close",
        alert_upload_successful: "File uploaded",
        error_copy: "Copy error",
    },
    it: {
        all_layers: "Tutti i livelli",
        layer: "Livello",
        rectangles: "Rettangoli",
        text: "Testo",
        copy_table: "Copia tabella",
        save_csv: "Salva CSV",
        close: "Chiudi",
        alert_error_filetype: "Formato non supportato",
        alert_data_copied: "Dati copiati",
        btn_save_csv: "Salva CSV",
        btn_copy: "Copia",
        btn_close: "Chiudi",
        alert_upload_successful: "File caricato",
        error_copy: "Copy error",
    },
}