import { jsonHelperRecordTypeField } from "./types";

export function setJsonFileFormatHelperDemoData() {
    const recordTypeFieldPostion: any = document.getElementById("recordTypeFieldPostion");
    recordTypeFieldPostion.value = 1;
    const recordTypeFieldLength: any = document.getElementById("recordTypeFieldLength");
    recordTypeFieldLength.value = 3;
    const fileStructureHelper: any = document.getElementById("fileStructureHelper");
    fileStructureHelper.value =
        `RT1	RT	3	true	
RT1	Field2	10	false	["BLA1", "BLA2"]
RT2	RT	3	X	
RT2	Field2	5		["TEST"]
RT3	RT	3	true	
RT3	Field2	4			^TEST$`
}

export function generateJSONFileFormat() {
    try {
        const recordTypeFieldPostion: any = document.getElementById("recordTypeFieldPostion");
        const recordTypeFieldLength: any = document.getElementById("recordTypeFieldLength");
        const fileStructureHelper: any = document.getElementById("fileStructureHelper");
        const recordTypeFields: string[] = fileStructureHelper.value.split("\n");

        if (isInteger(recordTypeFieldPostion.value) === false) {
            throw `Please enter an integer Record Type Field Position`;
        }
        if (recordTypeFieldPostion.value < 1) {
            throw `The Record Type Field Position must be greater than 0`;
        }
        if (isInteger(recordTypeFieldLength.value) === false) {
            throw `Please enter an integer Record Type Field Length`;
        }
        if (recordTypeFieldLength.value < 1) {
            throw `The Record Type Field Length must be greater than 0`;
        }

        const jsonHelperRecordTypeFields = getJsonHelperRecordTypeFields(recordTypeFields);
        const JSonFileFormat = getJsonFileFormat(recordTypeFieldPostion.value, recordTypeFieldLength.value, jsonHelperRecordTypeFields);
        const fileStructure: any = document.getElementById("fileStructure");
        fileStructure.value = JSonFileFormat;

    } catch (error) {
        alert(error);
    }

}

function getJsonHelperRecordTypeFields(recordTypesFields: string[]): jsonHelperRecordTypeField[] {
    let jsonHelperRecordTypeFields: jsonHelperRecordTypeField[] = [];

    recordTypesFields.forEach((recordTypefield, row) => {
        if (recordTypefield !== "") {
            let fields: string[] = recordTypefield.split("\t");
            let jsonHelperRecordTypeField: jsonHelperRecordTypeField = {
                recordTypeId: "",
                fieldId: "",
                fieldLength: 0,
                obligatory: false,
                allowedValues: "[]",
                regex: ""
            }
            fields.forEach((field, index) => {

                switch (index) {
                    case 0:
                        if (field === "") {
                            throw `Please enter the Record Type Id in row ${row + 1}`;
                        }
                        jsonHelperRecordTypeField.recordTypeId = field;
                        break;
                    case 1:
                        jsonHelperRecordTypeField.fieldId = field;
                        if (field === "") {
                            throw `Please enter the Field Id in row ${row + 1}`;
                        }
                        break;
                    case 2:
                        if (isInteger(field) === false) {
                            throw `Record Type: ${jsonHelperRecordTypeField.recordTypeId} Field: ${jsonHelperRecordTypeField.fieldId} the field length ${field} is not an integer value`;
                        }
                        jsonHelperRecordTypeField.fieldLength = parseInt(field);
                        if (jsonHelperRecordTypeField.fieldLength === 0) {
                            throw `Record Type: ${jsonHelperRecordTypeField.recordTypeId} Field: ${jsonHelperRecordTypeField.fieldId} the field length ${field} must be greater than 0`;
                        }
                        break;
                    case 3:
                        if (field.toLowerCase() === "true" || field.toUpperCase() === "X") {
                            jsonHelperRecordTypeField.obligatory = true;
                        }
                        else if (field.toLowerCase() === "false" || field === "") {
                            jsonHelperRecordTypeField.obligatory = false;
                        }
                        else {
                            throw `Record Type: ${jsonHelperRecordTypeField.recordTypeId} Field: ${jsonHelperRecordTypeField.fieldId} the attribute obligatory ${field} is not true or false or empty`;
                        }
                        break;
                    case 4:
                        if (field !== "") {
                            if (field.substring(0, 1) !== "[") {
                                throw `Record Type: ${jsonHelperRecordTypeField.recordTypeId} Field: ${jsonHelperRecordTypeField.fieldId} the allowed values ${field} are not in a string array format. It doesn't start with a [`;
                            }
                            try {
                                JSON.parse(field);
                            } catch (error) {
                                console.log(error);
                                throw `Record Type: ${jsonHelperRecordTypeField.recordTypeId} Field: ${jsonHelperRecordTypeField.fieldId} the allowed values ${field} are not in a string array format`;
                            }
                            jsonHelperRecordTypeField.allowedValues = field;
                        }
                        break;
                    case 5:
                        jsonHelperRecordTypeField.regex = field;
                        break;
                }
            })
            if (jsonHelperRecordTypeField.recordTypeId === "") {
                throw `Please enter the Record Type Id in row ${row + 1}`;
            }
            if (jsonHelperRecordTypeField.fieldId === "") {
                throw `Please enter the Field Id in row ${row + 1}`;
            }
            if (jsonHelperRecordTypeField.fieldLength === 0) {
                throw `Record Type: ${jsonHelperRecordTypeField.recordTypeId} Field: ${jsonHelperRecordTypeField.fieldId} the field length ${jsonHelperRecordTypeField.fieldLength} must be greater than 0`;
            }
            jsonHelperRecordTypeFields.push(jsonHelperRecordTypeField);

        }
    })
    if (jsonHelperRecordTypeFields.length === 0) {
        throw "Please enter the Record Types";
    }


    return jsonHelperRecordTypeFields;
}

function isInteger(str: string) {
    return /^\+?(0|[1-9]\d*)$/.test(str);
}

function getJsonFileFormat(recordTypeFieldPosition: number, recordTypeFieldLength: number, jsonHelperRecordTypeFields: jsonHelperRecordTypeField[]): string {
    let result: string =
        `{ "recordTypePos": ${recordTypeFieldPosition}, 
"recordTypeLength": ${recordTypeFieldLength},
"recordTypes": [
`
    let prevRecordTypeId: string = "";
    jsonHelperRecordTypeFields.forEach((jsonHelperRecordTypeField, index) => {
        if (prevRecordTypeId !== jsonHelperRecordTypeField.recordTypeId) {
            if (index !== 0) {
                // close previous record type field list and record type
                result = result + "]},";
            }
            // new record type
            result = result +
                `{"id": "${jsonHelperRecordTypeField.recordTypeId}",
"fields": [
`
        }
        else {
            // next field of the same record type
            result = result + ",";
        }
        // one record type field
        result = result +
            `{ "id": "${jsonHelperRecordTypeField.fieldId}",
"length": ${jsonHelperRecordTypeField.fieldLength},
"obligatory":  ${jsonHelperRecordTypeField.obligatory},
"allowedValues": ${jsonHelperRecordTypeField.allowedValues},
"regex": "${jsonHelperRecordTypeField.regex}"
    }
`;

        prevRecordTypeId = jsonHelperRecordTypeField.recordTypeId;
    }

    );
    if (jsonHelperRecordTypeFields.length > 0) {
        // close fields
        result = result + "]}"
    }
    // cloes record types and the whole json
    result = result + "]}";

    try {
        let resultPretty = JSON.stringify(JSON.parse(result), null, 2);
        return resultPretty;
    } catch (error) {
        console.log(error);
        alert(error);
        return result;
    }
}