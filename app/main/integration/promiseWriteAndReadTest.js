import config from '../src/config'
import influxService from '../src/influx/influxServices'
import {promiseWrite,promiseQuery ,promiseDeleteDatabase, promiseDatabase}from '../src/influx/influxServices'
console.log(influxService)
import {expect} from "chai";
describe('Database Names', () => {
    it("Returns a list that does not include a deleted name and includes a name when created", () => {
        return promiseDeleteDatabase()
            .then(promiseDatabase)
            .then(() => promiseWrite({missing: "array or object"}))
            .then(() => promiseQuery(
                `select * from response_times_2
where host = "testHost"
order by time desc
limit 10 `))

            .then(response => {
                expec(reponse).to.equal("Not this")
            })
    })
})