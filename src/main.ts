import * as fileConv from "./fileConv";
import * as struct from "./struct";
import { fileStructure, recordValidated } from "./types";
import { validateRecord } from "./validate";
import { setDemoData } from "./demoData";
import "@ui5/webcomponents/dist/TextArea";
import "@ui5/webcomponents/dist/Button";
import "@ui5/webcomponents/dist/Label";
import "@ui5/webcomponents/dist/Title";

let message: string = 'Hello, World!';
console.log(message);

const ui5BtnDemo: any = document.getElementById("demo");
ui5BtnDemo.addEventListener("click", () => {
  setDemoData();
});

const ui5BtnValidate: any = document.getElementById("validate");
ui5BtnValidate.addEventListener("click", () => {
  validate();
});

function validate() {
  const textAreaFileStructure: any = document.getElementById("fileStructure");
  const textAreaFileContent: any = document.getElementById("fileContent");
  const fileStructure:fileStructure = JSON.parse(textAreaFileStructure.value);
  const fileStructureEnhanced = struct.enhanceFileStructure(fileStructure);
  console.log(fileStructureEnhanced);
  const records = fileConv.fileToRecords(textAreaFileContent.value);
  console.log(records);

  let valPromises: Promise<recordValidated>[] = [];

  records.forEach(element => { valPromises.push(validateRecord(fileStructureEnhanced, element)) })
  Promise.all(valPromises).then((recordsValidated) => { 
        console.log(recordsValidated)
        const textAreaResult: any = document.getElementById("result");
        textAreaResult.value = JSON.stringify(recordsValidated,null,2);
      });

}






