module.exports = {
  command: 'ping',
  description: 'Vérifie la vitesse de réponse du bot',
  handler: async ({ sock, from }) => {
    const start = Date.now()
    const sent = await sock.sendMessage(from, { text: '🏓 Calcul en cours...' })
    const ms = Date.now() - start
    await sock.sendMessage(from, { text: `🏓 Pong ! ${ms} ms` }, { quoted: sent })
  }
}
