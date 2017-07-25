// import { Observable } from 'rxjs'
// import 'rx-from-csv'

// const fileToImport = __dirname + '/pp-2017.csv'

// // Observable.fromCSV(fileToImport).subscribe(data => {
// //   console.log(data)
// // })

// const fileToStream = x =>
//   Observable.fromCSV(x).subscribe(x => {
//     return x
//   })

// console.log(fileToStream(fileToImport))

import { Observable } from 'rxjs/Rx'

// https://gist.github.com/bjoerge/9e88a877a0633705b728
export default function fromStream(
  stream,
  finishEventName = 'end',
  dataEventName = 'data'
) {
  stream.pause()

  return new Observable(observer => {
    function dataHandler(data) {
      observer.next(data)
    }

    function errorHandler(err) {
      observer.error(err)
    }

    function endHandler() {
      observer.complete()
    }

    stream.addListener(dataEventName, dataHandler)
    stream.addListener('error', errorHandler)
    stream.addListener(finishEventName, endHandler)

    stream.resume()

    return () => {
      stream.removeListener(dataEventName, dataHandler)
      stream.removeListener('error', errorHandler)
      stream.removeListener(finishEventName, endHandler)
    }
  })
    .publish()
    .refCount()
}
