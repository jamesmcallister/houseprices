import ingest from "../src/ingest"
const Influx = require('influx');
describe('Ingest', function () {


    let testRowFound = () => {
        const influx = new Influx.InfluxDB({
            host: 'localhost',
            database: 'houseprices',
            schema: [
                {
                    measurement: 'house_prices',
                    fields: {
                        postcode: Influx.FieldType.STRING
                    },
                    tags: [
                        'host'
                    ]
                }
            ]
        })
        return influx.query(`
    select * from house_prices
    where postcode = "EXAMPLE POSTCODE" 
    limit 10
  `).then(result => {
            console.log(result)
        })
    };
    it('should not result in influxdb containing rows until ingest runs', () => testRowFound().then(
        () => {
            throw "Succeeded when no data should be preset"
        },
        () => {
        }
    ));
    ingest()
    it('should result in influxdb containing rows after ingest runs', testRowFound);
});
