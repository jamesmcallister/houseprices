export default promiseDatabaseNames => promiseCreateDatabase => databaseName =>
    promiseDatabaseNames(databaseName).then(names => {
        if (!names.includes(databaseName)) {
            console.log(`Create ${databaseName}`)
            return promiseCreateDatabase(databaseName)
        }
        else {
            console.log("Database exists")
            return Promise.resolve("")
        }
    })
