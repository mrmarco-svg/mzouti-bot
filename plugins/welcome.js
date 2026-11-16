const { isGroupAdmin, isOwner } = require('../lib/auth')
const { getGroup, saveGroup } = require('../lib/db')

module.exports = {
  command: 'welcome',
  description: 'Active ou désactive le message de bienvenue dans ce groupe',
  handler: async ({ sock, from, sender, args, isGroup }) => {
    if (!isGroup) return sock.sendMessage(from, { text: 'Cette commande ne marche que dans un groupe.' })

    const admin = isOwner(sender) || await isGroupAdmin(sock, from, sender)
    if (!admin) return sock.sendMessage(from, { text: '⛔ Réservé aux admins du groupe.' })

    const choix = (args[0] || '').toLowerCase()
    if (!['on', 'off'].includes(choix)) {
      return sock.sendMessage(from, { text: 'Utilisation : .welcome on / off' })
    }

    const group = getGroup(from)
    group.welcome = choix === 'on'
    saveGroup(from, group)

    await sock.sendMessage(from, { text: `✅ Bienvenue ${choix === 'on' ? 'activée' : 'désactivée'} pour ce groupe.` })
  }
}

// Appelée depuis index.js sur l'évènement group-participants.update
async function greet(sock, groupId, participants) {
  const group = getGroup(groupId)
  if (!group.welcome) return

  for (const jid of participants) {
    const texte = `👋 Bienvenue @${jid.split('@')[0]} dans le groupe !`
    await sock.sendMessage(groupId, { text: texte, mentions: [jid] })
  }
}

module.exports.greet = greet
