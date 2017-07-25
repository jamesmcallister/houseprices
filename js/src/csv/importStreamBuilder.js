export default csvClient => options => streamToImport =>
  csvClient(options).fromStream(streamToImport)
