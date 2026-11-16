module.exports = {
  command: 'pair',
  description: 'Génère un code de pairage pour un autre numéro (.pair +50900000000)',
  handler: async ({ sock, from, args }) => {
    const numero = (args[0] || '').replace(/[^0-9]/g, '')

    if (numero.length < 8) {
      return sock.sendMessage(from, { text: 'Utilisation : .pair +50900000000' })
    }

    try {
      const code = await sock.requestPairingCode(numero)
      await sock.sendMessage(from, { text: `🔑 Code de pairage pour +${numero} :\n\n*${code}*` })
    } catch (e) {
      await sock.sendMessage(from, { text: '⚠️ Impossible de générer le code pour ce numéro.' })
    }
  }
}
