# Flat File Validator

This [tool](https://fmabap.github.io/Flat_File_Validator/) is a quick and dirty flat file validator.

 You have to enter the file structure as JSON an the file content. You will receive the validation result as JSON and for each record or each record type (depending on your settings) a table with the records splitted into the fields.
 Errors are marked in red and you can find the error in the tooltip of the field.

 **Please be aware that the fields are checked without rtrim. This means "ABC" differs from "ABC ".**
 
 ## JSON file format
 You can find the JSON file format schema including example data in the [tool](https://fmabap.github.io/Flat_File_Validator/). 
 You should use an external JSON schema validator. There is only an alert if the JSON could not be parsed.
 
 