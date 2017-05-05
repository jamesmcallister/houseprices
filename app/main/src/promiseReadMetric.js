export const promiseReadDataBuilder = influxClient => influxDbHost => {
  return influxClient(influxDbHost)
}

export default () => {
  const influxClient = require('./influxClient').default()
  const config = require('./config').default
  return promiseReadDataBuilder(influxClient)(config.influxDbHost)
    .query(
      `
      select * from response_times_2
      where host = ${escape.stringLit(influxDbHost)}
      order by time desc
      limit 10
      I`
    )
    .then(rows =>
      rows.forEach(row =>
        console.log(`A request to ${row.path} took ${row.duration}ms`)
      )
    )
}
