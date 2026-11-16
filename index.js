const { startServer } = require('./lib/server')
const { startSession } = require('./lib/sessionManager')

startServer()
startSession('default')
