

import {record} from "./types";
export function fileToRecords(file: string): record[] {
    const rows: record[] = [];
    const lines = file.split("\n");
    lines.forEach((line, index) => {
        const row: record = { rowNumber: index + 1, value: line };
        rows.push(row);
    })
    return rows;
}