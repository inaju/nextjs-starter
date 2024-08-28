const pino = require('pino')

const logger = defaultConfig =>
  pino({
    ...defaultConfig,
    transport: {
        target: 'pino-pretty',
        customPrettifiers: {
            // The argument for this function will be the same
            // string that's at the start of the log-line by default:
            time: timestamp => `🕰 ${timestamp}`,
        
            // The argument for the level-prettifier may vary depending
            // on if the levelKey option is used or not.
            // By default this will be the same numerics as the Pino default:
            level: logLevel => `LEVEL: ${logLevel}`,
            // level provides additional data in `extras`:
            // * label => derived level label string
            // * labelColorized => derived level label string with colorette colors applied based on customColors and whether colors are supported
            level: (logLevel, key, log, { label, labelColorized, colors }) => `LEVEL: ${logLevel} LABEL: ${levelLabel} COLORIZED LABEL: ${labelColorized}`,
        
            // other prettifiers can be used for the other keys if needed, for example
            hostname: hostname => `MY HOST: ${hostname}`,
            pid: pid => pid,
            name: (name, key, log, { colors }) => `${colors.blue(name)}`,
            caller: (caller, key, log, { colors }) => `${colors.greenBright(caller)}`,
            myCustomLogProp: (value, key, log, { colors }) => `My Prop -> ${colors.bold(value)} <--`
          },
        options: {
          colorize: true,
          
        }
      }
  })

module.exports = {
  logger,
}