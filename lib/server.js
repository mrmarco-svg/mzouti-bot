const express = require('express')
const path = require('path')
const QRCode = require('qrcode')
const { startSession, getSession, sanitizeId } = require('./sessionManager')

function startServer() {
  const app = express()
  app.use(express.json())
  app.use(express.static(path.join(__dirname, '..', 'publique')))

  // GET /api/status?session=monNom
  app.get('/api/status', async (req, res) => {
    try {
      const id = sanitizeId(req.query.session)
      let entry = getSession(id)
      if (!entry) entry = await startSession(id) // démarre la session si elle n'existe pas encore

      let qrDataUrl = null
      if (entry.qr && !entry.connected) {
        qrDataUrl = await QRCode.toDataURL(entry.qr)
      }

      res.json({ session: id, connected: entry.connected, qr: qrDataUrl })
    } catch (e) {
      console.log('Erreur /api/status :', e)
      res.status(500).json({ error: 'Impossible de démarrer la session : ' + e.message })
    }
  })

  // POST /api/pair  { session, phone }
  app.post('/api/pair', async (req, res) => {
    try {
      const id = sanitizeId(req.body?.session)
      const { phone } = req.body || {}

      if (!phone || phone.length < 8) return res.status(400).json({ error: 'Numéro invalide.' })

      let entry = getSession(id)
      if (!entry) entry = await startSession(id)
      if (!entry.sock) return res.status(503).json({ error: 'La session démarre encore, réessaie dans quelques secondes.' })

      const code = await entry.sock.requestPairingCode(phone)
      res.json({ code })
    } catch (e) {
      console.log('Erreur /api/pair :', e)
      res.status(500).json({ error: 'Impossible de générer le code : ' + e.message })
    }
  })

  const port = process.env.PORT || 3000
  app.listen(port, () => console.log(`✓ Site web lancé sur le port ${port}`))
}

module.exports = { startServer }
