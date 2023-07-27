
async function copyTextToClipboard(text: string) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

export default async function copySpreadsheetData(rows: string[][]) {
    const text = rows.map(values => values.join('\t')).join('\n')
    await copyTextToClipboard(text)
}