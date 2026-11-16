const settings = require('../config/settings')

module.exports = {
  command: ['owner', 'proprio'],
  description: 'Affiche les coordonnées du propriétaire du bot',
  handler: async ({ sock, from }) => {
    const vcard =
      'BEGIN:VCARD\n' +
      'VERSION:3.0\n' +
      `FN:${settings.ownerName}\n` +
      `TEL;type=CELL;type=VOICE;waid=${settings.ownerNumber}:+${settings.ownerNumber}\n` +
      'END:VCARD'

    await sock.sendMessage(from, {
      contacts: {
        displayName: settings.ownerName,
        contacts: [{ vcard }]
      }
    })
  }
}
