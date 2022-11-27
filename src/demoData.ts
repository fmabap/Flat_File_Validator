import { fileStructure } from "./types";
import "@ui5/webcomponents/dist/TextArea";

export function setDemoData() {
    setDemoFileStructure();
    setDemoFile();
}

function setDemoFileStructure() {
    const fileStructure: fileStructure = {
        recordTypeLength: 3,
        recordTypePos: 1,
        recordTypes: [{
            id: "RT1", fields: [{ id: "RT", length: 3, obligatory: true, allowedValues: [], regex: "" },
            { id: "Field2", length: 10, obligatory: false, allowedValues: ["BLA1"], regex: "" }],
        },
        {
            id: "RT2", fields: [{ id: "RT", length: 3, obligatory: true, allowedValues: [], regex: "" },
            { id: "Field2", length: 5, obligatory: false, allowedValues: ["TEST"], regex: "" }],
        },
        {
            id: "RT3", fields: [{ id: "RT", length: 3, obligatory: true, allowedValues: [], regex: "" },
            { id: "Field2", length: 4, obligatory: false, allowedValues: [], regex: "^TEST$" }],
        }

        ]
    };

    const textAreaFileStructure: any = document.getElementById("fileStructure");
    textAreaFileStructure.value = JSON.stringify(fileStructure,null,2);

}

export function setDemoFile() {
const fileContent:string = `RT1BLA1
RT2BLABLUB
UNKNOW_RECORD_TYPE

RT3TEST
RT3TES`;
const textAreaFileContent: any = document.getElementById("fileContent");
textAreaFileContent.value = fileContent;
}