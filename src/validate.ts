import { fileStructureEnhanced, recordTypeEnhanced, record, recordValidated, fieldValidated } from "./types";
import { getErrorMessage } from "./errorMsg";
export function validateRecord(structExt: fileStructureEnhanced, record: record) {
    return new Promise<recordValidated>((resolve: any, _reject: any) => {

        let recordValidated: recordValidated = { rowNumber: record.rowNumber, hasError: false, recordType: "", isUnknownRecordType: false, fields: [], rest: "", errors: [] };
        // Get Record Type
        let recordTypeEnhanced: recordTypeEnhanced;
        try {
            recordTypeEnhanced = getRecordTypeEnhanced(record, structExt);
            if (recordTypeEnhanced === undefined) {
                //Record is empty
                recordValidated.recordType = "";
                recordValidated.isUnknownRecordType = true;
                recordValidated.rest = record.value;
                resolve(recordValidated);
            }

        } catch (error) {
            //Unknow Record Type
            recordValidated.recordType = record.value.substring(structExt.recordTypePos - 1, structExt.recordTypePos - 1 + structExt.recordTypeLength);
            recordValidated.isUnknownRecordType = true;
            recordValidated.rest = record.value;
            recordValidated.errors.push(getErrorMessage(error));
            recordValidated.hasError = true;
            resolve(recordValidated);
        }

        //Validate the fields
        recordValidated.recordType = recordTypeEnhanced!.id;
        validateFields(recordValidated, record, recordTypeEnhanced!);
        resolve(recordValidated);
    }
    )
}

function validateFields(recordValidated: recordValidated, record: record, recordTypeEnhanced: recordTypeEnhanced) {
    recordTypeEnhanced.fields.forEach(field => {
        let fieldValidated: fieldValidated = { id: field.id, value: record.value.substring(field.subStringStart, field.subStringEnd), errors: [] }

        // Check is obligatory
        if (field.obligatory === true && containsStringOnlySpaces(fieldValidated.value) === true) {
            fieldValidated.errors.push("The Field is obligatory");
        }

        // Check allowed values
        if (fieldValidated.value.length > 0) {
            if (field.allowedValues.length > 0 && field.allowedValues.some(element => element === fieldValidated.value) === false) {
                fieldValidated.errors.push(`The value ${fieldValidated.value} is not allowed `);
            }
            // Check regex
            if (field.regex !== "") {
                const regex = new RegExp(field.regex);
                if (regex.test(fieldValidated.value) === false) {
                    fieldValidated.errors.push(`The value ${fieldValidated.value} doesn't match with the regex ${field.regex} `);
                }
            }
        }
        recordValidated.fields.push(fieldValidated);
        if (fieldValidated.errors.length > 0) {
            recordValidated.hasError = true;
        }

    })
    recordValidated.rest = record.value.substring(recordTypeEnhanced.length);
    if (recordValidated.rest !== "") {
        recordValidated.errors.push(`The record is to long (${record.value.length} instead of ${recordTypeEnhanced.length})`);
        recordValidated.hasError = true;
    }
}


function getRecordTypeEnhanced(record: record, structExt: fileStructureEnhanced): recordTypeEnhanced {
    if (record.value === null || record.value === "") {
        return undefined!;
    }
    if (record.value.length < structExt.recordTypePos + structExt.recordTypeLength) {
        let err: string = `The record is to short ${record.value.length} to have a record type at position ${structExt.recordTypePos} with the length ${structExt.recordTypeLength}.`
        throw new Error(err);
    }
    const recordType: string = record.value.substring(structExt.recordTypePos - 1, structExt.recordTypePos - 1 + structExt.recordTypeLength);

    const recordTypeEnhanced = getRecordTypeEnhancedFromArray(recordType, structExt)

    if (recordTypeEnhanced === undefined) {
        let err: string = `The record has the unknow record type ${recordType}.`
        throw new Error(err);
    }
    return recordTypeEnhanced;
}

function getRecordTypeEnhancedFromArray(recordType: string, structExt: fileStructureEnhanced): recordTypeEnhanced {
    return structExt.recordTypes.find(element => element.id === recordType)!;
}

function containsStringOnlySpaces(str:string):boolean {
    return /^\s*$/.test(str);
  }