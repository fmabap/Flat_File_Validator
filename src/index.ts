let message: string = 'Hello, World!';
console.log(message);

const fileStructure: fileStructure = {
  recordTypeLength: 3,
  recordTypePos: 1,
  recordTypes: [{
    id: "RT1", fields: [{ id: "RT", length: 3, obligatory: true },
    { id: "Field2", length: 10, obligatory: false }],
  },
  {
    id: "RT2", fields: [{ id: "RT", length: 3, obligatory: true },
    { id: "Field2", length: 5, obligatory: false }],
  }

  ]
};

const fileStructureEnhanced = enhanceFileStructure(fileStructure);
const element = document.createElement("div");
element.innerHTML = JSON.stringify(fileStructureEnhanced);
document.body.appendChild(element);

const file = `RT1BLA1
RT2BLABLUB`;

const lines = xfileToArray(file);
console.log(lines);
