interface fileStructure {
    recordTypePos: number,
    recordTypeLength: number,
    recordTypes: {
        id: string,
        fields: {
            id: string,
            length: number
            obligatory?: boolean,
            allowedValues?: Array<string>,
            regex?: string
        }[]
    }[]
}
interface fieldEnhanced {
    id: string,
    pos: number
    length: number
    obligatory?: boolean,
    allowedValues?: Array<string>,
    regex?: string
}
interface recordTypeEnhanced {
    id: string,
    length: number,
    fields: fieldEnhanced[]
}

interface fileStructureEnhanced {
    recordTypePos: number,
    recordTypeLength: number,
    recordTypes: recordTypeEnhanced[]
}

function enhanceFileStructure(fileStructure: fileStructure): fileStructureEnhanced {
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
function fileToArray(file:string):string[]{
    const lines = file.split("\n");
    return lines;
    }

