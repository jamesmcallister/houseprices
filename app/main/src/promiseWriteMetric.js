export const promiseWriteDataBuilder = influxClient => influxDbHost => writePoint => objectToWrite => {
  return influxClient(influxDbHost)
  // .writePoint(objectToWrite)
}

// Refactor this:
// const promiseWriteData = () => influxClient().writePoints([
//     {
//         measurement: 'response_times_2',
//         tags: {host: config.influxDbHost},
//         fields: {duration: 123, path: "testpath"},
//     }
// ]);
let promiseWriteDataFuction = null
export default () => {
  let config = require('./config')
  const influxDbHost = config.default.influxDbHost
  if (promiseWriteDataFuction === null) {
    const influxClient = require('./influxClient.js').default()
    const objectToWrite = influxDbHost => [
      {
        measurement: 'response_times_2',
        tags: { host: influxDbHost },
        fields: { duration: 123, path: 'testpath' }
      }
    ]
    promiseWriteDataFuction = promiseWriteDataBuilder(influxClient)
    return promiseWriteDataFuction(influxDbHost)
  } else {
    return promiseWriteDataFuction(influxDbHost)
  }
}
