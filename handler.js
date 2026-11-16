const settings = require('../config/settings')

function getText(msg) {
  const m = msg.message
  if (!m) return ''
  return (
    m.conversation ||
    m.extendedTextMessage?.text ||
    m.imageMessage?.caption ||
    m.videoMessage?.caption ||
    ''
  )
}

async function handleMessage(sock, msg, commands) {
  if (!msg.message || msg.key.fromMe) return

  const from = msg.key.remoteJid
  const sender = msg.key.participant || msg.key.remoteJid
  const isGroup = from.endsWith('@g.us')
  const text = getText(msg).trim()

  if (!text.startsWith(settings.prefix)) return

  const body = text.slice(settings.prefix.length).trim()
  const [cmdName, ...args] = body.split(/\s+/)
  const plugin = commands[cmdName.toLowerCase()]

  if (!plugin) return

  // Contrôle du mode (public / private / privad)
  const isOwner = sender.startsWith(settings.ownerNumber)
  if (settings.mode === 'private' && !isOwner) return
  // 'privad' : propriétaire + admins de groupe -> à compléter avec groupMetadata

  try {
    await plugin.handler({ sock, msg, from, sender, isGroup, args, text: body })
  } catch (e) {
    console.log('Erreur commande', cmdName, e)
    await sock.sendMessage(from, { text: '⚠️ Une erreur est survenue en exécutant cette commande.' })
  }
}

module.exports = { handleMessage, getText }
