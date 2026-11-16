const settings = require('../config/settings')
const { isOwner } = require('../lib/auth')

module.exports = {
  command: 'mode',
  description: 'Change le mode du bot : public, private ou privad',
  handler: async ({ sock, from, sender, args }) => {
    if (!isOwner(sender)) {
      return sock.sendMessage(from, { text: '⛔ Commande réservée au propriétaire.' })
    }

    const choix = (args[0] || '').toLowerCase()
    if (!['public', 'private', 'privad'].includes(choix)) {
      return sock.sendMessage(from, {
        text: 'Utilisation : .mode public | .mode private | .mode privad\n\n' +
              'public : tout le monde peut utiliser le bot\n' +
              'private : seul le propriétaire\n' +
              'privad : propriétaire + admins de groupe'
      })
    }

    settings.mode = choix
    await sock.sendMessage(from, { text: `✅ Mode changé : ${choix}` })
  }
}
