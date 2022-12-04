export interface fileStructure {
    recordTypePos: number,
    recordTypeLength: number,
    recordTypes: {
        id: string,
        fields: {
            id: string,
            length: number
            obligatory: boolean,
            allowedValues: Array<string>,
            regex: string
        }[]
    }[]
}
export interface fieldEnhanced {
    id: string,
    pos: number,
    length: number,
    subStringStart: number,
    subStringEnd: number,
    obligatory: boolean,
    allowedValues: Array<string>,
    regex: string
}
export interface recordTypeEnhanced {
    id: string,
    length: number,
    fields: fieldEnhanced[]
}

export interface fileStructureEnhanced {
    recordTypePos: number,
    recordTypeLength: number,
    recordTypes: recordTypeEnhanced[]
}

export interface record {
    rowNumber: number
    value: string
}

export interface fieldValidated {
    id: string,
    value: string,
    errors: string[]
}
export interface recordValidated {
    rowNumber: number,
    hasError: boolean,
    recordType: string,
    isUnknownRecordType: boolean,
    fields: fieldValidated[],
    rest: string,
    errors: string[]
}

export interface jsonHelperRecordTypeField {
    recordTypeId: string,
    fieldId: string,
    fieldLength: number,
    obligatory?: boolean,
    allowedValues?: string,
    regex?: string
}