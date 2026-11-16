const settings = require('../config/settings')
const { isOwner } = require('../lib/auth')
const { getSettings, saveSettings } = require('../lib/db')

module.exports = {
  command: 'antiviewonce',
  description: 'Active ou désactive la récupération des messages à vue unique',
  handler: async ({ sock, from, sender, args }) => {
    if (!isOwner(sender)) {
      return sock.sendMessage(from, { text: '⛔ Commande réservée au propriétaire.' })
    }

    const choix = (args[0] || '').toLowerCase()
    if (!['on', 'off'].includes(choix)) {
      return sock.sendMessage(from, { text: 'Utilisation : .antiviewonce on / off' })
    }

    const s = getSettings()
    s.antiviewonce = choix === 'on'
    saveSettings(s)

    await sock.sendMessage(from, { text: `✅ Antiviewonce ${choix === 'on' ? 'activé' : 'désactivé'}.` })
  }
}

// Appelée depuis le handler principal pour chaque message reçu
// NOTE : ceci est une version simplifiée. Pour un envoi fiable de l'image/vidéo,
// utilise downloadMediaMessage (fourni par @whiskeysockets/baileys) pour récupérer
// le buffer réel avant de le renvoyer, plutôt que de réutiliser l'URL chiffrée telle quelle.
async function forwardIfViewOnce(sock, msg) {
  const s = getSettings()
  if (!s.antiviewonce) return

  const m = msg.message
  const viewOnce =
    m?.viewOnceMessage?.message ||
    m?.viewOnceMessageV2?.message ||
    m?.viewOnceMessageV2Extension?.message

  if (!viewOnce) return

  const from = msg.key.remoteJid
  const sender = msg.key.participant || msg.key.remoteJid
  const groupe = from.endsWith('@g.us') ? ` (groupe : ${from})` : ''

  const legende = `👁️ Message à vue unique récupéré\nDe : @${sender.split('@')[0]}${groupe}`
  const ownerJid = settings.ownerNumber + '@s.whatsapp.net'

  if (viewOnce.imageMessage) {
    await sock.sendMessage(ownerJid, {
      image: { url: viewOnce.imageMessage.url || viewOnce.imageMessage },
      caption: legende,
      mentions: [sender]
    }).catch(() => {})
  } else if (viewOnce.videoMessage) {
    await sock.sendMessage(ownerJid, {
      video: { url: viewOnce.videoMessage.url || viewOnce.videoMessage },
      caption: legende,
      mentions: [sender]
    }).catch(() => {})
  } else {
    await sock.sendMessage(ownerJid, { text: legende, mentions: [sender] }).catch(() => {})
  }
}

module.exports.forwardIfViewOnce = forwardIfViewOnce
