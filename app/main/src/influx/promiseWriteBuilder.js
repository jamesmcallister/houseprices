export const promiseWriteDataBuilder = influxClient => writePoints => influxClient.writePoints(writePoints)

// Refactor this:
// const promiseWriteData = () => influxClient().writePoints([
//     {
//         measurement: 'response_times_2',
//         tags: {host: config.influxDbHost},
//         fields: {duration: 123, path: "testpath"},
//     }
// ]);
let promiseWriteData = null
export default () => {
  const config = require('../config').default
  if (promiseWriteData === null) {
      promiseWriteData = promiseWriteDataBuilder(require('./influxClientBuilder.js').default());
  }
  return promiseWriteData
}
