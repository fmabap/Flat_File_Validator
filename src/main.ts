import * as fileConv from "./fileConv";
import * as struct from "./struct";
import {fileStructure, recordValidated} from "./types";
import {validateRecord} from "./validate";
let message: string = 'Hello, World!';
console.log(message);

const fileStructure: fileStructure = {
  recordTypeLength: 3,
  recordTypePos: 1,
  recordTypes: [{
    id: "RT1", fields: [{ id: "RT", length: 3, obligatory: true, allowedValues: [], regex: ""  },
    { id: "Field2", length: 10, obligatory: false,  allowedValues: ["BLA1"], regex: "" }],
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

const fileStructureEnhanced = struct.enhanceFileStructure(fileStructure);
/*const element = document.createElement("div");
element.innerHTML = JSON.stringify(fileStructureEnhanced);
document.body.appendChild(element);
*/
console.log(fileStructureEnhanced);

const file = `RT1BLA1
RT2BLABLUB
RT3TEST`;

const records = fileConv.fileToRecords(file);
console.log(records);

let valPromises:Promise<recordValidated>[] = [];

records.forEach(element => { valPromises.push(validateRecord(fileStructureEnhanced,element ))})
Promise.all(valPromises).then((recordsValidated)=>{ console.log(recordsValidated)});