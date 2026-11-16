const { isGroupAdmin, isOwner } = require('../lib/auth')
const { getGroup, saveGroup } = require('../lib/db')

const LINK_REGEX = /(https?:\/\/|www\.|chat\.whatsapp\.com)/i
const MAX_WARNINGS = 5

module.exports = {
  command: 'antilink',
  description: 'Active ou désactive la suppression des liens dans ce groupe',
  handler: async ({ sock, from, sender, args, isGroup }) => {
    if (!isGroup) return sock.sendMessage(from, { text: 'Cette commande ne marche que dans un groupe.' })

    const admin = isOwner(sender) || await isGroupAdmin(sock, from, sender)
    if (!admin) return sock.sendMessage(from, { text: '⛔ Réservé aux admins du groupe.' })

    const choix = (args[0] || '').toLowerCase()
    if (!['on', 'off'].includes(choix)) {
      return sock.sendMessage(from, { text: 'Utilisation : .antilink on / off' })
    }

    const group = getGroup(from)
    group.antilink = choix === 'on'
    saveGroup(from, group)

    await sock.sendMessage(from, { text: `✅ Antilink ${choix === 'on' ? 'activé' : 'désactivé'} pour ce groupe.` })
  }
}

// Appelée depuis le handler principal sur chaque message d'un groupe
async function checkLink({ sock, from, sender, text, msg }) {
  const group = getGroup(from)
  if (!group.antilink) return false
  if (!LINK_REGEX.test(text)) return false

  if (isOwner(sender)) return false // le propriétaire du bot n'est jamais concerné
  const admin = await isGroupAdmin(sock, from, sender)
  if (admin) return false // les admins ne sont pas concernés

  // Supprime le message contenant le lien
  await sock.sendMessage(from, { delete: msg.key })

  group.warnings[sender] = (group.warnings[sender] || 0) + 1
  const count = group.warnings[sender]

  if (count >= MAX_WARNINGS) {
    await sock.groupParticipantsUpdate(from, [sender], 'remove').catch(() => {})
    group.warnings[sender] = 0
    saveGroup(from, group)
    await sock.sendMessage(from, { text: `🚫 @${sender.split('@')[0]} exclu après ${MAX_WARNINGS} liens envoyés.`, mentions: [sender] })
  } else {
    saveGroup(from, group)
    await sock.sendMessage(from, {
      text: `⚠️ @${sender.split('@')[0]} les liens sont interdits ici (${count}/${MAX_WARNINGS}).`,
      mentions: [sender]
    })
  }
  return true
}

module.exports.checkLink = checkLink
