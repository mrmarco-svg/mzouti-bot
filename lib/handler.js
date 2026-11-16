const settings = require('../config/settings')
const { isOwner, isGroupAdmin } = require('./auth')
const { checkLink } = require('../plugins/antilink')
const { forwardIfViewOnce } = require('../plugins/antiviewonce')

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

  // Récupération des messages à vue unique (fonctionne partout, groupe ou privé)
  await forwardIfViewOnce(sock, msg)

  // Suppression des liens (uniquement en groupe)
  if (isGroup) {
    const supprime = await checkLink({ sock, from, sender, text, msg })
    if (supprime) return
  }

  if (!text.startsWith(settings.prefix)) return

  const body = text.slice(settings.prefix.length).trim()
  const [cmdName, ...args] = body.split(/\s+/)
  const plugin = commands[cmdName.toLowerCase()]

  if (!plugin) return

  // Contrôle du mode (public / private / privad)
  const ownerAccess = isOwner(sender)
  if (settings.mode === 'private' && !ownerAccess) return

  if (settings.mode === 'privad' && !ownerAccess) {
    const admin = isGroup ? await isGroupAdmin(sock, from, sender) : false
    if (!admin) return
  }

  try {
    await plugin.handler({ sock, msg, from, sender, isGroup, args, text: body })
  } catch (e) {
    console.log('Erreur commande', cmdName, e)
    await sock.sendMessage(from, { text: '⚠️ Une erreur est survenue en exécutant cette commande.' })
  }
}

module.exports = { handleMessage, getText }
