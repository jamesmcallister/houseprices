import { FieldType } from 'influx'
export default [
  {
    measurement: 'response_times',
    fields: {
      path: FieldType.STRING,
      duration: FieldType.INTEGER,
      price: FieldType.INTEGER,
      date: FieldType.STRING,
      postcode: FieldType.STRING,
      city: FieldType.STRING,
      county: FieldType.STRING
    },
    tags: ['host']
  }
]
