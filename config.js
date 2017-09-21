const path = require('path')

const APP = path.resolve(__dirname, 'app')
const BUILD = path.resolve(__dirname, 'build')
const SCRIPTS = path.resolve(APP, 'scripts')

const config = {
  APP,
  BUILD,
  SCRIPTS,
}

module.exports = config
