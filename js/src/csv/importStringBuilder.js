export default csvClient => options => streamToString =>
  csvClient(options).fromString(streamToString)
