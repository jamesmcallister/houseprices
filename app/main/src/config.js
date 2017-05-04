import {FieldType} from 'influx'
export default {
    influxDbHost : process.env.INFLUXDB_HOST,
    databaseName : "testit",
    schema :  [
        {
            measurement: 'response_times',
            fields: {
                path: FieldType.STRING,
                duration: FieldType.INTEGER
            },
            tags: [
                'host'
            ]
        }
    ]
}