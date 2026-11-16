const { isOwner } = require('../lib/auth')
const { getSettings, saveSettings } = require('../lib/db')

module.exports = {
  command: 'anticall',
  description: 'Active ou désactive le rejet automatique des appels',
  handler: async ({ sock, from, sender, args }) => {
    if (!isOwner(sender)) {
      return sock.sendMessage(from, { text: '⛔ Commande réservée au propriétaire.' })
    }

    const choix = (args[0] || '').toLowerCase()
    if (!['on', 'off'].includes(choix)) {
      return sock.sendMessage(from, { text: 'Utilisation : .anticall on / off' })
    }

    const s = getSettings()
    s.anticall = choix === 'on'
    saveSettings(s)

    await sock.sendMessage(from, { text: `✅ Anticall ${choix === 'on' ? 'activé' : 'désactivé'}.` })
  }
}

// Appelée depuis index.js sur l'évènement 'call'
async function rejectIncomingCalls(sock, calls) {
  const s = getSettings()
  if (!s.anticall) return

  for (const call of calls) {
    if (call.status === 'offer') {
      await sock.rejectCall(call.id, call.from).catch(() => {})
      await sock.sendMessage(call.from, {
        text: '📵 Les appels ne sont pas acceptés sur ce numéro, écris-moi plutôt un message.'
      }).catch(() => {})
    }
  }
}

module.exports.rejectIncomingCalls = rejectIncomingCalls
