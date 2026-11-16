const express = require('express')
const path = require('path')
const QRCode = require('qrcode')

// État partagé mis à jour depuis index.js
const state = {
  connected: false,
  lastQR: null // chaîne brute du QR, convertie en image à la demande
}

function startServer(getSock) {
  const app = express()
  app.use(express.json())
  app.use(express.static(path.join(__dirname, '..', 'publique')))

  app.get('/api/status', async (req, res) => {
    let qrDataUrl = null
    if (state.lastQR && !state.connected) {
      qrDataUrl = await QRCode.toDataURL(state.lastQR)
    }
    res.json({ connected: state.connected, qr: qrDataUrl })
  })

  app.post('/api/pair', async (req, res) => {
    const sock = getSock()
    const { phone } = req.body || {}

    if (!sock) return res.status(503).json({ error: 'Le bot démarre encore, réessaie dans quelques secondes.' })
    if (!phone || phone.length < 8) return res.status(400).json({ error: 'Numéro invalide.' })

    try {
      const code = await sock.requestPairingCode(phone)
      res.json({ code })
    } catch (e) {
      res.status(500).json({ error: 'Impossible de générer le code.' })
    }
  })

  const port = process.env.PORT || 3000
  app.listen(port, () => console.log(`✓ Site web lancé sur le port ${port}`))
}

module.exports = { startServer, state }
