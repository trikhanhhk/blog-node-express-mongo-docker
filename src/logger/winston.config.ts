import * as winston from 'winston'
import 'winston-daily-rotate-file'

const { format, createLogger, transports } = winston
const { combine, timestamp, printf } = format

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white'
}

winston.addColors(colors)

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`
})

export const logger = createLogger({
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss ' }), logFormat),
  transports: [
    new transports.DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error'
    }),
    new transports.DailyRotateFile({
      filename: 'logs/info-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'info'
    }),
    new transports.Console({
      level: 'info'
    })
  ]
})
