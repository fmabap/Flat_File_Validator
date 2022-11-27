import { fileStructureEnhanced, recordTypeEnhanced, recordValidated } from "./types";
export function getOutputTableForEachRecord(recordsValidated: recordValidated[], fileStructureEnhanced: fileStructureEnhanced, errorsOnly: boolean):string {
    let output: string ="";

    recordsValidated.forEach(recordValidated => {
        if (errorsOnly === true && recordValidated.hasError === false) {
            return;
        }

        const recordType = fileStructureEnhanced.recordTypes.find(element => element.id === recordValidated.recordType);

        if (recordType === undefined) {
            // output unknown record type table
            output = output + getTableDefinitionForUnknownRecordType()  + "\n" + getTableRowForUnknownRecordType(recordValidated);
            output = output + "\n" + "</ui5-table>" + "\n" + "<BR>" + "<BR>" +"\n";
        }
        else {
            // output record type table
            output = output + getTableDefinitionForRecordType(recordType) + "\n" + getTableRowForRecordType(recordValidated);
            output = output + "\n" + "</ui5-table>" + "\n" + "<BR>" + "<BR>" +"\n";
        }
    });
    return output;
}

function getTableDefinitionForUnknownRecordType():string{
    let output: string;
    // header
    const header: string = `<div class="header"><span style="color:red">Recordtype: Unknown</span></div>`
    const table: string = `
<ui5-table stickyColumnHeader = "true"  >`;
    let columns: string[] = [];

    //columns
    let column: string =`
<ui5-table-column slot="columns">
<span style="line-height: 1.4rem" min-width="5rem" >RecNo</span>
</ui5-table-column>
`;
    columns.push(column);
    
    column = `<ui5-table-column slot="columns">
<span style="line-height: 1.4rem" min-width="10rem">RecordType</span>
</ui5-table-column>
`;
    columns.push(column);

    column = `<ui5-table-column slot="columns">
<span style="line-height: 1.4rem" min-width="10rem">Rest</span>
</ui5-table-column>
`;
    columns.push(column);

    // put everything together
    output = header + table;
    columns.forEach(element => { output = output + element });
    return output;
}

function getTableDefinitionForRecordType(recordType: recordTypeEnhanced): string {
    let output: string;
    // header
    const header: string = `<div class="header"><span>Recordtype: ${recordType.id}</span></div>`
    const table: string = `
<ui5-table stickyColumnHeader = "true"  >`;
    let columns: string[] = [];

    //columns
    let column: string =`
<ui5-table-column slot="columns">
<span style="line-height: 1.4rem" min-width="5rem" >RecNo</span>
</ui5-table-column>
`;
    columns.push(column);
    recordType.fields.forEach(field => {
        let column: string = `
<ui5-table-column slot="columns">
<span style="line-height: 1.4rem" min-width="${field.length}rem" title="Pos:${field.pos} Length: ${field.length}"> ${field.id}</span>
</ui5-table-column>
`;
        columns.push(column);
    })
    column = `<ui5-table-column slot="columns">
<span style="line-height: 1.4rem" min-width="10rem">Rest</span>
</ui5-table-column>
`;
    columns.push(column);

    // put everything together
    output = header + table;
    columns.forEach(element => { output = output + element });
    return output;
}


function getTableRowForUnknownRecordType(recordValidated: recordValidated): string {
    let output: string;
    const rowStart: string = `<ui5-table-row>`;
    const rowEnd: string = `</ui5-table-row>`;

    let recordNumberCol: string;
    recordNumberCol = getColumnContentRowNumber(recordValidated);
    const recorTypeCol = getColumnContentDummyRecordType(recordValidated);
    const restCol = getColumnContentRest(recordValidated);

    output = rowStart + "\n" + recordNumberCol;

    output = output + "\n" + recorTypeCol + "\n" + restCol + "\n" + rowEnd;
    return output;
}

function getTableRowForRecordType(recordValidated: recordValidated): string {
    let output: string;
    const rowStart: string = `<ui5-table-row>`;
    const rowEnd: string = `</ui5-table-row>`;

    let recordNumberCol: string;
    recordNumberCol = getColumnContentRowNumber(recordValidated);
    
    let fieldCols: string[] = [];
    let fieldCol: string;
    recordValidated.fields.forEach(field => {
        let errors: string = "";
        field.errors.forEach(error => {
            if (errors === "") {
                errors = error;
            }
            else {
                errors = errors + "\n" + error;
            }
        }
        );
        if (field.errors.length > 0) {
            console.log(errors);
            fieldCol = `<ui5-table-cell><span style="color:red" title ="${errors}" overflow="visible">${field.value}</span></ui5-table-cell>`
        }
        else {
            fieldCol = `<ui5-table-cell><span>${field.value}</span></ui5-table-cell>`
        }
        fieldCols.push(fieldCol);
    });
    
    const restCol = getColumnContentRest(recordValidated);
    output = rowStart + "\n" + recordNumberCol;
    fieldCols.forEach(element => { output = output + "\n" + element });
    output = output + "\n" + restCol + "\n" + rowEnd;
    return output;
}

function getColumnContentRest(recordValidated: recordValidated): string {
    let rest: string;
    if (recordValidated.rest !== "") {
        rest = `<ui5-table-cell><span style="color:red">${recordValidated.rest}</span></ui5-table-cell>`
    }
    else {
        rest = `<ui5-table-cell><span>${recordValidated.rest}</span></ui5-table-cell>`
    }
    return rest;
}

function getColumnContentDummyRecordType(recordValidated: recordValidated): string {
    let rest: string;
            rest = `<ui5-table-cell><span style="color:red">${recordValidated.recordType}</span></ui5-table-cell>`
    return rest;
}

function getColumnContentRowNumber(recordValidated: recordValidated): string {
    let recordNumber: string;
    let genErrors: string = "";
    recordValidated.errors.forEach(error => {
        if (genErrors === "") {
            genErrors = error;
        }
        else {
            genErrors = genErrors + "\n" + error;
        }
    }
    )
    if (recordValidated.errors.length > 0) {
        recordNumber = `<ui5-table-cell><span style="color:red" title ="${genErrors}">${recordValidated.rowNumber}</span></ui5-table-cell>`
    }
    else {
        recordNumber = `<ui5-table-cell><span>${recordValidated.rowNumber}</span></ui5-table-cell>`
    }
    return recordNumber;
}