const settings = require('../config/settings')

function isOwner(jid) {
  return jid.startsWith(settings.ownerNumber)
}

// Nécessite groupMetadata (sock.groupMetadata(from)) pour les groupes
async function isGroupAdmin(sock, groupId, userId) {
  try {
    const meta = await sock.groupMetadata(groupId)
    const participant = meta.participants.find(p => p.id === userId)
    return participant?.admin === 'admin' || participant?.admin === 'superadmin'
  } catch (e) {
    return false
  }
}

module.exports = { isOwner, isGroupAdmin }
