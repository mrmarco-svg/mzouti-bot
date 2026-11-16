const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion
} = require('@whiskeysockets/baileys')
const pino = require('pino')
const fs = require('fs')
const path = require('path')
const settings = require('../config/settings')
const { loadPlugins } = require('./loader')
const { handleMessage } = require('./handler')
const autoJoin = require('./autojoin')
const { rejectIncomingCalls } = require('../plugins/anticall')
const { greet } = require('../plugins/welcome')

const commands = loadPlugins() // partagé entre toutes les sessions

// sessions.get(id) => { sock, connected, qr, startedAt }
const sessions = new Map()

// Empêche deux démarrages simultanés de la même session (ce qui créait
// deux connexions WhatsApp en parallèle et cassait le pairing code)
const startingPromises = new Map()

function sanitizeId(id) {
  return String(id || 'default').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 40) || 'default'
}

function ensureFolder(folder) {
  if (fs.existsSync(folder) && !fs.statSync(folder).isDirectory()) {
    fs.unlinkSync(folder)
  }
  fs.mkdirSync(folder, { recursive: true })
}

function getSession(rawId) {
  const id = sanitizeId(rawId)
  return sessions.get(id) || null
}

function listSessions() {
  return [...sessions.entries()].map(([id, s]) => ({
    id,
    connected: s.connected,
    startedAt: s.startedAt
  }))
}

async function startSession(rawId) {
  const id = sanitizeId(rawId)
  const existing = sessions.get(id)
  if (existing?.sock) return existing // déjà démarrée

  // Si un démarrage est déjà en cours pour cet id, on attend son résultat
  // au lieu d'en lancer un second en parallèle.
  if (startingPromises.has(id)) return startingPromises.get(id)

  const promise = doStartSession(id)
  startingPromises.set(id, promise)
  try {
    return await promise
  } finally {
    startingPromises.delete(id)
  }
}

async function doStartSession(id) {
  const entry = { sock: null, connected: false, qr: null, startedAt: Date.now() }
  sessions.set(id, entry)

  const folder = path.join('database', 'sessions', id)
  ensureFolder(folder)

  const { state: authState, saveCreds } = await useMultiFileAuthState(folder)
  const { version } = await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    version,
    logger: pino({ level: 'silent' }),
    auth: authState,
    markOnlineOnConnect: settings.alwaysOnline,
    browser: [settings.botName, 'Chrome', '1.0.0']
  })

  entry.sock = sock

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update

    if (qr) entry.qr = qr

    if (connection === 'open') {
      console.log(`✓ [${id}] ${settings.botName} connecté !`)
      entry.connected = true
      entry.qr = null
      await autoJoin(sock)

      if (settings.alwaysOnline) {
        await sock.sendPresenceUpdate('available')
      }
    }

    if (connection === 'close') {
      entry.connected = false
      const code = lastDisconnect?.error?.output?.statusCode
      const loggedOut = code === DisconnectReason.loggedOut

      if (loggedOut) {
        console.log(`✗ [${id}] déconnecté (logout), session arrêtée.`)
        sessions.delete(id)
      } else {
        console.log(`… [${id}] connexion fermée, reconnexion.`)
        entry.sock = null
        sessions.delete(id)
        startSession(id)
      }
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

  sock.ev.on('group-participants.update', async ({ id: groupId, participants, action }) => {
    if (action === 'add') await greet(sock, groupId, participants)
  })

  // Présence permanente rafraîchie pour toutes les sessions actives
  setInterval(() => {
    if (settings.alwaysOnline && entry.connected) {
      sock.sendPresenceUpdate('available').catch(() => {})
    }
  }, 25000)

  return entry
}

module.exports = { startSession, getSession, listSessions, sanitizeId }
