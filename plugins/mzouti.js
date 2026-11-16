const settings = require('../config/settings')
const { toItalic } = require('../lib/fonts')

module.exports = {
  command: 'mzouti',
  description: 'Présente le bot et son écosystème',
  handler: async ({ sock, from }) => {
    const texte =
      `${settings.symboles.etoile} ${toItalic(settings.botName)} ${settings.symboles.etoile}\n\n` +
      toItalic(`Bot WhatsApp officiel de l'écosystème MZOUTI.`) + '\n' +
      toItalic(`Propriétaire : ${settings.ownerName}`) + '\n\n' +
      `${settings.symboles.coeur} ${settings.liens.affilie}`

    await sock.sendMessage(from, { text: texte })
  }
}
