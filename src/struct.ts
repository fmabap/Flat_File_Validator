
import {fileStructure,fileStructureEnhanced, recordTypeEnhanced, fieldEnhanced }   from "./types";
export function enhanceFileStructure(fileStructure: fileStructure): fileStructureEnhanced {
    const fileStructureEnhanced: fileStructureEnhanced = {
        recordTypePos: fileStructure.recordTypePos,
        recordTypeLength: fileStructure.recordTypeLength,
        recordTypes: []
    }

    fileStructure.recordTypes.forEach(recordType => {
        const recordTypeEnhanced: recordTypeEnhanced = {
            id: recordType.id,
            length: 0,
            fields: []
        }
        let curPos: number = 1;
        recordType.fields.forEach(field => {

            const fieldEnhanced: fieldEnhanced = {
                id: field.id,
                pos: curPos,
                length: field.length,
                subStringStart: curPos - 1,
                subStringEnd: curPos - 1 +  field.length, // last sign is exclusive
                obligatory: field.obligatory,
                allowedValues: field.allowedValues,
                regex: field.regex
            }
            curPos = curPos + field.length;
            recordTypeEnhanced.length = curPos - 1;
            recordTypeEnhanced.fields.push(fieldEnhanced);
        })
        fileStructureEnhanced.recordTypes.push(recordTypeEnhanced);
    })
    return fileStructureEnhanced;
}


