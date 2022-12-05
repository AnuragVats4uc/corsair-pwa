// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')

export const removeOldData = (): void => {
    fs.readdirSync('./preload/data/')
        .filter((f: string) => /[.]json/.test(f))
        .forEach((f: string) => fs.unlinkSync(`./preload/data/${f}`))
    fs.readdirSync('./config/stores/')
        .filter((f: string) => /[.]ts/.test(f))
        .forEach((f: string) => fs.unlinkSync(`./config/stores/${f}`))
}
