import * as fileConv from "./fileConv";
import * as struct from "./struct";
import { fileStructure, recordValidated } from "./types";
import { validateRecord } from "./validate";
import { setDemoData, setDemoFile, setDemoFileStructure } from "./demoData";
import { getOutputTableForEachRecord, getOutputTableGroupedByRecordType } from "./output";
import { setJsonFileFormatHelperDemoData, generateJSONFileFormat } from "./jsonFileFormatHelper";
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
import "@ui5/webcomponents/dist/List";
import "@ui5/webcomponents/dist/StandardListItem";
import "@ui5/webcomponents/dist/Input";
import "@ui5/webcomponents/dist/TabContainer";
import "@ui5/webcomponents/dist/Tab";
import "@ui5/webcomponents/dist/TabSeparator";

window.addEventListener("load", () => { init() });

function init() {
  const ui5BtnDemo: any = document.getElementById("demo");
  ui5BtnDemo.addEventListener("click", () => {
    setDemoData();
  });

  const ui5BtnDemoFileContent: any = document.getElementById("demoFileContent");
  ui5BtnDemoFileContent.addEventListener("click", () => {
    setDemoFile();
  });


  const ui5BtnDemoFileStructure: any = document.getElementById("demoFileStructure");
  ui5BtnDemoFileStructure.addEventListener("click", () => {
    setDemoFileStructure();
  });

  const ui5BtnDemoJFHelper: any = document.getElementById("generateJSONDemo");
  ui5BtnDemoJFHelper.addEventListener("click", () => {
    setJsonFileFormatHelperDemoData();
  });

  const ui5BtnGenerateJFHelper: any = document.getElementById("generateJSON");
  ui5BtnGenerateJFHelper.addEventListener("click", () => {
    generateJSONFileFormat();
  });

  const ui5BtnValidate: any = document.getElementById("validate");
  ui5BtnValidate.addEventListener("click", async () => {
    validate();
  });

  const fileStructureSchema: any = document.getElementById("fileStructureSchema");
  fileStructureSchema.value =
    `{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "description": "Flat File Validator JSON Schema for File Structure",
  "type": "object",
  "properties": {
    "recordTypePos": {
      "type": "integer",
      "description": "Position of the record type field in the records, starting from 1"
    },
    "recordTypeLength": {
      "type": "integer",
      "description": "Length of the record type field"
    }, 
    "recordTypes": {
      "type": "array",
      "description": "Array with all record types",
      "items": [
        {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "Id (name) of the record type"
            },
            "fields": {
              "type": "array",
              "description": "Array with all fields of the record type, must be in the order left to right",
              "items": [
                {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "description": "Id (name) of the field"
                    },
                    "length": {
                      "type": "integer",
                      "description": "Length of the field"
                    },
                    "obligatory": {
                      "type": "boolean",
                      "description": "Flag (true / false) if a field is obligatory. If it is obligatory then it can not contain only spaces"
                    },
                    "allowedValues": {
                      "type": "array",
                      "description": "An array with all allowedValues. If the array is empty then it will not be checked",
                      "items": {}
                    },
                    "regex": {
                      "type": "string",
                      "description": "A regex that the field content must match. If the regex is empty then it will not be checked. Please be aware that you have to enter it in JSON format. This means, that you have to escape for example a backslash with two backslashs"
                    }
                  },
                  "required": [
                    "id",
                    "length",
                    "obligatory",
                    "allowedValues",
                    "regex"
                  ]
                }
              ]
            }
          },
          "required": [
            "id",
            "fields"
          ]
        }
      ]
    }
  },
  "required": [
    "recordTypeLength",
    "recordTypePos",
    "recordTypes"
  ]
}`
}
function validate() {
  const textAreaFileStructure: any = document.getElementById("fileStructure");
  const textAreaFileContent: any = document.getElementById("fileContent");
  let fileStructure: fileStructure;
  try {
    if (textAreaFileStructure.value === "") {
      let err: string = `Please enter the JSON File Structure first`;
      throw new Error(err);
    }
    fileStructure = JSON.parse(textAreaFileStructure.value);
  } catch (error) {
    alert(error);
    return;
  }

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
    const ui5TabContainerValidator: any = document.getElementById("tabContainerValidator");

    // Select result tab
    const items: any[] = ui5TabContainerValidator.allItems
    items.forEach(tab => {
      if (tab.id === "tabResult") {
        tab.selected = true;
      }
      else {
        tab.selected = false;
      }
    });
  });

}