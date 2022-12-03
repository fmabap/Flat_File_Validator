import { fileStructureEnhanced, recordTypeEnhanced, record, recordValidated, fieldValidated } from "./types";

export function setJsonFileFormatHelperDemoData(){
    const recordTypeFieldPostion: any = document.getElementById("recordTypeFieldPostion");
    recordTypeFieldPostion.value = 1;
    const recordTypeFieldLength: any = document.getElementById("recordTypeFieldLength");
    recordTypeFieldLength.value = 3;
const fileStructureHelper: any = document.getElementById("fileStructureHelper");
fileStructureHelper.value =
`RT1	RT	3	true	
RT1	Field2	10	false	["BLA1", "BLA2"]
RT2	RT	3	true	
RT2	Field2	5		["TEST"]
RT2	RT	3	true	
RT2	Field2	4		^TEST$`
}