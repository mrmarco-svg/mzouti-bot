const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion
} = require('@whiskeysockets/baileys')
const pino = require('pino')
const settings = require('./config/settings')
const { loadPlugins } = require('./lib/loader')
const { handleMessage } = require('./lib/handler')
const autoJoin = require('./lib/autojoin')
const { startServer, state } = require('./lib/server')
const { rejectIncomingCalls } = require('./plugins/anticall')
const { greet } = require('./plugins/welcome')

const commands = loadPlugins()
let currentSock = null

async function startBot() {
  const { state: authState, saveCreds } = await useMultiFileAuthState('database/sessions')
  const { version } = await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    version,
    logger: pino({ level: 'silent' }),
    printQRInTerminal: true, // utilisé uniquement si tu ne passes pas par le pairing code
    auth: authState,
    markOnlineOnConnect: settings.alwaysOnline
  })

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update

    if (qr) state.lastQR = qr

    if (connection === 'open') {
      console.log(`✓ ${settings.botName} connecté !`)
      state.connected = true
      state.lastQR = null
      await autoJoin(sock)

      // Présence permanente, rafraîchie régulièrement
      if (settings.alwaysOnline) {
        await sock.sendPresenceUpdate('available')
        setInterval(() => {
          if (settings.alwaysOnline) sock.sendPresenceUpdate('available').catch(() => {})
        }, 25000)
      }
    }

    if (connection === 'close') {
      state.connected = false
      const code = lastDisconnect?.error?.output?.statusCode
      const shouldReconnect = code !== DisconnectReason.loggedOut
      console.log('Connexion fermée. Reconnexion :', shouldReconnect)
      if (shouldReconnect) startBot()
    }
  })

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0]
    if (!msg) return
    await handleMessage(sock, msg, commands)
  })

  sock.ev.on('call', async (calls) => {
    await rejectIncomingCalls(sock, calls)
  })

  sock.ev.on('group-participants.update', async ({ id, participants, action }) => {
    if (action === 'add') await greet(sock, id, participants)
  })

  // Exemple pour activer le pairing code au lieu du QR :
  // if (!sock.authState.creds.registered) {
  //   const code = await sock.requestPairingCode('50900000000')
  //   console.log('Code de pairage :', code)
  // }

  currentSock = sock
  return sock
}

startServer(() => currentSock)
startBot()
