import winston from 'winston'
winston.level = 'debug'

const location = `/var/houseprices`

let logger = new winston.Logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      name: 'info-file',
      filename: `${location}/filelog-info.log`,
      level: 'info'
    }),
    new winston.transports.File({
      name: 'error-file',
      filename: `${location}/filelog-error.log`,
      level: 'error'
    }),
    new winston.transports.File({
      name: 'warn-file',
      filename: `${location}/filelog-warn.log`,
      level: 'warn'
    })
  ]
})

export default logger
