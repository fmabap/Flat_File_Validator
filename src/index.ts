let message: string = 'Hello, World!';
console.log(message);

interface fileStructure  {
  recordTypeOffset:number,
  recordTypeLength:number,
recordTypes:{id:string,
fields:{  id:string,
  length:number
  obligatory?:boolean,
  allowedValues?:Array<string>,
  regex?:string}[]}[]
}

const fileStr:fileStructure = { recordTypeLength: 3,
  recordTypeOffset:0,
  recordTypes:[{id: "RT1", fields:[{id:"RT", length:3, obligatory:true}, {id:"Field2", length:10, obligatory:false}]}]
            };
           