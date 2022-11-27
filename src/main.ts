import * as fileConv from "./fileConv";
import * as struct from "./struct";
import { fileStructure, recordValidated } from "./types";
import { validateRecord } from "./validate";
import { setDemoData } from "./demoData";
import { getOutputTableForEachRecord, getOutputTableGroupedByRecordType } from "./output";
import "@ui5/webcomponents/dist/TextArea";
import "@ui5/webcomponents/dist/Button";
import "@ui5/webcomponents/dist/Label";
import "@ui5/webcomponents/dist/Title";
import "@ui5/webcomponents/dist/Table";
import "@ui5/webcomponents/dist/TableColumn";
import "@ui5/webcomponents/dist/TableRow";
import "@ui5/webcomponents/dist/TableCell";
import "@ui5/webcomponents/dist/Panel";
import "@ui5/webcomponents/dist/Checkbox";

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
  const fileStructure: fileStructure = JSON.parse(textAreaFileStructure.value);
  const fileStructureEnhanced = struct.enhanceFileStructure(fileStructure);

  const records = fileConv.fileToRecords(textAreaFileContent.value);


  let valPromises: Promise<recordValidated>[] = [];

  records.forEach(element => { valPromises.push(validateRecord(fileStructureEnhanced, element)) })
  Promise.all(valPromises).then((recordsValidated) => {

    const textAreaResult: any = document.getElementById("result");
    textAreaResult.value = JSON.stringify(recordsValidated, null, 2);
    const showOnlyErrors: any = document.getElementById("chBShowOnlyErrors")!;
    let output: string = "";
    const groupRecordTypes: any = document.getElementById("chBGroupByRecordType")!;

    if (groupRecordTypes.checked === true) {
      output = getOutputTableGroupedByRecordType(recordsValidated, fileStructureEnhanced, showOnlyErrors.checked);
    }
    else {
      output = getOutputTableForEachRecord(recordsValidated, fileStructureEnhanced, showOnlyErrors.checked);
    }

    const divOutput: Element = document.getElementById("output")!;
    divOutput.innerHTML = output!;

  });

}






