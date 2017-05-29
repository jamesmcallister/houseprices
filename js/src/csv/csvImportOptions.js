export const headerOptions = [
  'uuid', //0
  'price', //1
  'date', //2
  'postcode', //3
  'unknown1', //4
  'unknown2', //5
  'unknown3', //6
  'number', //7
  'flat', //8
  'street1', //9
  'street2', //10
  'street3', //11
  'city', //12
  'county', //13
  'unknown4', //14
  'unknown5' //15
]

export const includedColumns = [1, 2, 3, 12, 13]

export const ingnoreColumns = []

export const csvOptions = {
  noheader: true,
  toArrayString: true,
  headers: headerOptions,
  includeColumns: includedColumns,
  ignoreColumn: ingnoreColumns,
  checkType: true
}
