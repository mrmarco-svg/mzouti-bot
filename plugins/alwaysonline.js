const settings = require('../config/settings')
const { isOwner } = require('../lib/auth')

module.exports = {
  command: 'alwaysonline',
  description: 'Active ou désactive la présence permanente (en ligne)',
  handler: async ({ sock, from, args, sender }) => {
    if (!isOwner(sender)) {
      return sock.sendMessage(from, { text: '⛔ Commande réservée au propriétaire.' })
    }

    const choix = (args[0] || '').toLowerCase()
    if (choix === 'on') {
      settings.alwaysOnline = true
      await sock.sendPresenceUpdate('available')
      return sock.sendMessage(from, { text: '✅ Présence permanente activée.' })
    }
    if (choix === 'off') {
      settings.alwaysOnline = false
      return sock.sendMessage(from, { text: '✅ Présence permanente désactivée.' })
    }
    await sock.sendMessage(from, { text: `Utilisation : .alwaysonline on / off` })
  }
}
