const settings = require('../config/settings')
const { toItalic } = require('../lib/fonts')

module.exports = {
  command: ['repo', 'liens', 'groupe', 'chaine'],
  description: 'Envoie les liens officiels MZouti',
  handler: async ({ sock, from }) => {
    const texte =
      `${settings.symboles.puce} ${toItalic('Liens officiels MZouti')}\n\n` +
      `🌐 Site : ${settings.liens.site}\n` +
      `🔗 Affilié : ${settings.liens.affilie}\n` +
      `📣 Chaîne : ${settings.liens.chaine}\n` +
      `👥 Groupe : ${settings.liens.groupe}`

    await sock.sendMessage(from, { text: texte })
  }
}
