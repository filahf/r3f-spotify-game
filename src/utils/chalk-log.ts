import chalk from 'chalk'

const log = console.log

export const authLog = (msg: string) => log(chalk.yellow('auth') + '  - ' + msg)

export const colorPass = chalk.green
export const colorWarning = chalk.hex('#FFA500')
export const colorError = chalk.bold.red
