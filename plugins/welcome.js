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

function buildWelcomeText(jid) {
  return `╭━━━〔 👑 𝐌𝐙𝐎𝐔𝐓𝐈✄𝐁𝐎𝐓 〕━━━╮

🎉 𝐁𝐈𝐄𝐍𝐕𝐄𝐍𝐔𝐄 𝐃𝐀𝐍𝐒 𝐋𝐄 𝐆𝐑𝐎𝐔𝐏𝐄 ! 🎉

╰━━━━━━━━━━━━━━━━━━━━╯

👋 Salut @${jid.split('@')[0]} !

💚 Nous sommes ravis de t'accueillir parmi nous !

🤝 Ici, chaque membre compte. Nous espérons que tu passeras de bons moments avec toute la communauté.

📜 Quelques conseils :
➪ Respecte les autres membres.
➪ Évite le spam.
➪ Respecte les règles du groupe.
➪ Participe dans la bonne humeur !

━━━━━━━━━━━━━━━━━━

🤖 𝐌𝐞𝐬𝐬𝐚𝐠𝐞 𝐞𝐧𝐯𝐨𝐲𝐞́ 𝐩𝐚𝐫 :
👑 𝐌𝐙𝐎𝐔𝐓𝐈✄𝐁𝐎𝐓

💻 Plus qu'un bot... un assistant intelligent !

🌐 https://mzouti-bot.onrender.com

━━━━━━━━━━━━━━━━━━
💚 𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐓𝐎 𝐓𝐇𝐄 𝐅𝐀𝐌𝐈𝐋𝐘 !`
}

// Appelée depuis index.js sur l'évènement group-participants.update
async function greet(sock, groupId, participants) {
  const group = getGroup(groupId)
  if (!group.welcome) return

  for (const jid of participants) {
    await sock.sendMessage(groupId, { text: buildWelcomeText(jid), mentions: [jid] })
  }
}

module.exports.greet = greet
