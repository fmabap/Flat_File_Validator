
export interface row {
    rowNumber: number
    content: string
}


export function fileToRows(file: string): row[] {
    const rows: row[] = [];
    const lines = file.split("\n");
    lines.forEach((line, index) => {
        const row: row = { rowNumber: index + 1, content: line };
        rows.push(row);
    })
    return rows;
}