const statusEl = document.getElementById('status')
const qrBox = document.getElementById('qrBox')
const phoneInput = document.getElementById('phone')
const getCodeBtn = document.getElementById('getCode')
const pairResult = document.getElementById('pairResult')
const pairCodeEl = document.getElementById('pairCode')

async function refreshStatus() {
  try {
    const res = await fetch('/api/status')
    const data = await res.json()

    if (data.connected) {
      statusEl.textContent = '● connecté'
      statusEl.classList.add('connected')
      qrBox.innerHTML = '<p class="qr-placeholder">Déjà connecté ✓</p>'
      return
    }

    statusEl.textContent = '● en attente de connexion'
    statusEl.classList.remove('connected')

    if (data.qr) {
      qrBox.innerHTML = `<img src="${data.qr}" alt="QR code de connexion">`
    }
  } catch (e) {
    statusEl.textContent = '● serveur injoignable'
  }
}

getCodeBtn.addEventListener('click', async () => {
  const phone = phoneInput.value.replace(/[^0-9]/g, '')
  if (phone.length < 8) {
    alert('Entre un numéro valide avec l\'indicatif du pays.')
    return
  }

  getCodeBtn.disabled = true
  getCodeBtn.textContent = 'Génération...'

  try {
    const res = await fetch('/api/pair', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone })
    })
    const data = await res.json()

    if (data.code) {
      pairCodeEl.textContent = data.code
      pairResult.hidden = false
    } else {
      alert(data.error || 'Impossible de générer le code pour le moment.')
    }
  } catch (e) {
    alert('Serveur injoignable, réessaie dans un instant.')
  }

  getCodeBtn.disabled = false
  getCodeBtn.textContent = 'Obtenir le code'
})

refreshStatus()
setInterval(refreshStatus, 4000)
