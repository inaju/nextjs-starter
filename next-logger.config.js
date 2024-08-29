const pino = require('pino')

const fileTransport = pino.transport({
    target: 'pino/file',
    options: { destination: './logfile.txt' },
})



const logger = defaultConfig =>
    pino({
        level: process.env.PINO_LOG_LEVEL || 'info',
        formatters: {
            level: (label) => {
                return { severity: label.toUpperCase() };
            },
        },
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
            }
        },
        ...defaultConfig,
    })

module.exports = {
    logger,
};