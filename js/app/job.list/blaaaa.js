let tmpArr = []
rs
  .pipe(csv({}, { objectMode: true }))
  .pipe(
    new Writable({
      write: function(json, encoding, callback) {
        tmpArr.push(json)
        if (tmpArr.length === 5000) {
          myDb.save(tmpArr, () => {
            tmpArr = []
            callback()
          })
        } else {
          callback()
        }
      },
      objectMode: true
    })
  )
  .on('finish', () => {
    if (tmpArr.length > 0) {
      myDb.save(tmpArr, () => {
        tmpArr = []
      })
    }
  })

const parentStream = Rx.Observable.from(data_array)
parentStream
  .map(url => {
    return createEventStream(url)
  })
  .mergeAll()
  .subscribe(
    x => console.log(x),
    e => console.log('Error', e),
    console.log('Complete')
  )

function createEventStream(url) {
  return Rx.Observable.fromEvent(
    x(url, '#centercol ul li', [{ name: 'a', link: 'a@href' }])
      .write()
      .pipe(JSONStream.parse('*')),
    'data'
  )
}
