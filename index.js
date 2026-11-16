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

const commands = loadPlugins()

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('database/sessions')
  const { version } = await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    version,
    logger: pino({ level: 'silent' }),
    printQRInTerminal: true, // utilisé uniquement si tu ne passes pas par le pairing code
    auth: state,
    markOnlineOnConnect: settings.alwaysOnline
  })

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update

    if (connection === 'open') {
      console.log(`✓ ${settings.botName} connecté !`)
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

  // Exemple pour activer le pairing code au lieu du QR :
  // if (!sock.authState.creds.registered) {
  //   const code = await sock.requestPairingCode('50900000000')
  //   console.log('Code de pairage :', code)
  // }

  return sock
}

startBot()
