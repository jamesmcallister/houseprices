//when refactored, influx should not be imported directy
import promiseDatabase from './influx/promiseDatabaseBuilder'
import promiseDeleteDatabaseBuilder from './influx/promiseDeleteDatabaseBuilder'
import promiseWriteBuilder from './influx/promiseWriteBuilder.js'
import promiseQueryBuilder from './influx/promiseQueryBuilder.js'

promiseDeleteDatabaseBuilder()
  .then(promiseDatabase)
  .then(promiseWriteData)
  .then(promiseQueryBuilder)

// const promiseWriteData = () =>
//   influxClient().writePoints([
//     {
//       measurement: 'response_times_2',
//       tags: { host: config.influxDbHost },
//       fields: { duration: 123, path: 'testpath' }
//     }
//   ])
// const promiseReadData = () =>
//   influxClient()
//     .query(
//       `
// select * from response_times_2
// where host = ${escape.stringLit(config.influxDbHost)}
// order by time desc
// limit 10
// `
//     )
//     .then(rows =>
//       rows.forEach(row =>
//         console.log(`A request to ${row.path} took ${row.duration}ms`)
//       )
//     )
// the following is the only part of functinoality in this file
