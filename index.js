const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion
} = require('@whiskeysockets/baileys')
const pino = require('pino')
const fs = require('fs')
const qrcodeTerminal = require('qrcode-terminal')

// Sécurité : si "database/sessions" existe mais n'est pas un dossier
// (par ex. créé par erreur comme un fichier sur GitHub), on corrige
// automatiquement au lieu de planter le déploiement.
function ensureSessionsFolder(folder) {
  if (fs.existsSync(folder) && !fs.statSync(folder).isDirectory()) {
    console.log(`⚠️  "${folder}" n'est pas un dossier, suppression et recréation...`)
    fs.unlinkSync(folder)
  }
  fs.mkdirSync(folder, { recursive: true })
}
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
  ensureSessionsFolder('database/sessions')
  const { state: authState, saveCreds } = await useMultiFileAuthState('database/sessions')
  const { version } = await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    version,
    logger: pino({ level: 'silent' }),
    auth: authState,
    markOnlineOnConnect: settings.alwaysOnline,
    browser: [settings.botName, 'Chrome', '1.0.0'] // nom affiché dans "Appareils connectés"
  })

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update

    if (qr) {
      state.lastQR = qr
      qrcodeTerminal.generate(qr, { small: true })
    }

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
