import { FieldType } from 'influx'
export default [
  {
    measurement: 'response_times',
    fields: {
      path: FieldType.STRING,
      duration: FieldType.INTEGER
    },
    tags: ['host']
  }
]
