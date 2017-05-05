export const promiseWriteDataBuilder = influxClient => influxDbHost => {
  return influxClient(influxDbHost)
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
    promiseWriteDataFuction = promiseWriteDataBuilder(influxClient)
    return promiseWriteDataFuction(influxDbHost)
  } else {
    return promiseWriteDataFuction(influxDbHost)
  }
}
