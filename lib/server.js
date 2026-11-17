const express = require('express')
const path = require('path')
const QRCode = require('qrcode')
const { startSession, getSession, sanitizeId } = require('./sessionManager')

function startServer() {
  const app = express()
  app.use(express.json())
  app.use(express.static(path.join(__dirname, '..', 'publique')))

  app.get('/api/status', async (req, res) => {
    try {
      const id = sanitizeId(req.query.session)
      let entry = getSession(id)
      if (!entry) entry = await startSession(id)

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

  app.post('/api/pair', async (req, res) => {
    try {
      const id = sanitizeId(req.body?.session)
      const { phone } = req.body || {}

      if (!phone || phone.length < 8) return res.status(400).json({ error: 'Numéro invalide.' })

      const entry = await Promise.race([
        startSession(id, { pairPhone: phone }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Délai dépassé, WhatsApp n\'a pas répondu. Réessaie.')), 25000))
      ])

      if (!entry.pairingCode) {
        return res.status(500).json({ error: 'Code non généré, réessaie dans un instant.' })
      }

      res.json({ code: entry.pairingCode })
    } catch (e) {
      console.log('Erreur /api/pair :', e)
      res.status(500).json({ error: e.message })
    }
  })

  const port = process.env.PORT || 3000
  app.listen(port, () => console.log(`✓ Site web lancé sur le port ${port}`))
}

module.exports = { startServer }
