const cfg = require('../config/autojoin')
const sleep = ms => new Promise(r => setTimeout(r, ms))
const pause = () => sleep(3000 + Math.random() * 4000)

module.exports = async function autoJoin(sock) {
  if (!cfg.enabled) return

  for (const code of cfg.groups) {
    try {
      await sock.groupAcceptInvite(code)
      console.log('✓ Groupe rejoint :', code)
    } catch (e) {
      console.log('✗ Groupe ignoré :', code, e.message)
    }
    await pause()
  }

  for (const code of cfg.channels) {
    try {
      const meta = await sock.newsletterMetadata('invite', code)
      await sock.newsletterFollow(meta.id)
      console.log('✓ Chaîne suivie :', code)
    } catch (e) {
      console.log('✗ Chaîne ignorée :', code, e.message)
    }
    await pause()
  }
}
