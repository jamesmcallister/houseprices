const Influx = require('influx');
const influx = new Influx.InfluxDB({
 host: '172.17.0.2',
 database: 'express_response_db',
 schema: [
   {
     measurement: 'response_times',
     fields: {
       path: Influx.FieldType.STRING,
       duration: Influx.FieldType.INTEGER
     },
     tags: [
       'host'
     ]
   }
 ]
})
influx.getDatabaseNames()
  .then(names => {
    console.log("getdatabasenames")
    if (!names.includes('express_response_db')) {
      return influx.createDatabase('express_response_db');
    }
  }).then(() => {
return influx.writePoints([
  {
    measurement: 'response_times',
    tags: { host: "172.17.0.2"},
    fields: { duration: 123, path: "testpath" },
  }
])}).then(() => {
  return influx.query(`
    select * from response_times
    where host = ${Influx.escape.stringLit("172.17.0.2")}
    order by time desc
    limit 10
  `)
}).then(rows => {
  rows.forEach(row => console.log(`A request to ${row.path} took ${row.duration}ms`))
})

