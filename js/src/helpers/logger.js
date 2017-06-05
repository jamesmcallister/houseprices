import winston from 'winston'
winston.level = 'debug'

const location = `/var/houseprices`

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      colorize: true,
      level: 'debug'
      // }),
      // new winston.transports.File({
      //   name: 'info-file',
      //   filename: `${location}/filelog-info.log`,
      //   level: 'info'
      // }),
      // new winston.transports.File({
      //   name: 'error-file',
      //   filename: `${location}/filelog-error.log`,
      //   level: 'error'
      // }),
      // new winston.transports.File({
      //   name: 'warn-file',
      //   filename: `${location}/filelog-warn.log`,
      //   level: 'warn'
    })
  ]
})
logger.cli()

export default logger

// logger.info("127.0.0.1 - there's no place like home")
// logger.warn("127.0.0.1 - there's no place like home")
// logger.error("127.0.0.1 - there's no place like home")
// logger.debug("127.0.0.1 - there's no place like home")
