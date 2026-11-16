const settings = require('../config/settings')
const { toItalic, menuLine } = require('../lib/fonts')

module.exports = {
  command: ['menu', 'help'],
  description: 'Affiche le menu des commandes',
  handler: async ({ sock, from, msg }) => {
    const texte =
      `${settings.symboles.etoile} ${toItalic(settings.botName)} ${settings.symboles.etoile}\n\n` +
      menuLine('ping') + '\n' +
      menuLine('owner') + '\n' +
      menuLine('mzouti') + '\n' +
      menuLine('repo') + '\n\n' +
      toItalic(`Préfixe : ${settings.prefix}`)

    // Image en haut, texte en bas (remplace le buffer par ton propre logo)
    await sock.sendMessage(from, {
      image: { url: './media/logo.jpg' },
      caption: texte
    }, { quoted: msg })
  }
}
