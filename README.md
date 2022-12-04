# Flat File Validator

This [tool](https://fmabap.github.io/Flat_File_Validator/) is a simple flat file validator.

You have to enter the file structure as JSON and the file content. Each record must be on a separate line. You will receive the validation result as JSON and for each record or each record type (depending on your settings) a table with the records splitted into the fields. Fields with errors are marked in red. You can find the error in the tooltip of the field.

The following things can be checked:
- if the record is to long
- if obligatory fields are filled
- if fields contain only allowed values
- if fields match with a regex
 
**Please be aware that the fields are checked without right trim. This means "ABC" differs from "ABC ".**

## JSON file format
You can find the JSON file format schema [here](./json.schema.json) or including example data in the [tool](https://fmabap.github.io/Flat_File_Validator/) (just press the button "Fill with demo data"). You should use an external JSON schema validator. There is only an alert if the JSON could not be parsed.
There is also a helper in the [tool](https://fmabap.github.io/Flat_File_Validator/) to generate the JSON from tab delimited data like in this [Excel sheet](./public/Demo-File-Structure-Helper.xlsx).

## Offline mode
The [tool](https://fmabap.github.io/Flat_File_Validator/) needs no server. You can download the repository, unzip it and just open the [index.html](./docs/index.html) in the [docs folder](./docs/) with a browser.

## Technical stuff
The [tool](https://fmabap.github.io/Flat_File_Validator/) is created with [TypesScript](https://www.typescriptlang.org/). It uses [UI5 Web Components](https://sap.github.io/ui5-webcomponents/) and the [Vite Framework](https://vitejs.dev/).
 
 