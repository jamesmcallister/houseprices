export default influxClient => writePoints =>
  influxClient.writePoints(writePoints)
