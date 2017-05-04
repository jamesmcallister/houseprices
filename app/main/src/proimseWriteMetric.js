// Refactor this:
// const promiseWriteData = () => influxClient().writePoints([
//     {
//         measurement: 'response_times_2',
//         tags: {host: config.influxDbHost},
//         fields: {duration: 123, path: "testpath"},
//     }
// ]);
