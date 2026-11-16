const statusEl = document.getElementById('status')
const statusTextEl = statusEl.querySelector('.status-text')
const qrBox = document.getElementById('qrBox')
const phoneInput = document.getElementById('phone')
const getCodeBtn = document.getElementById('getCode')
const pairResult = document.getElementById('pairResult')
const pairCodeEl = document.getElementById('pairCode')
const sessionInput = document.getElementById('sessionName')

// Mémorise le nom de session sur cet appareil pour éviter de le retaper
sessionInput.value = localStorage.getItem('mzouti_session') || 'default'
sessionInput.addEventListener('change', () => {
  localStorage.setItem('mzouti_session', sessionInput.value.trim() || 'default')
})

function currentSession() {
  return (sessionInput.value || 'default').trim() || 'default'
}

async function refreshStatus() {
  try {
    const res = await fetch(`/api/status?session=${encodeURIComponent(currentSession())}`)
    const data = await res.json()

    if (data.error) {
      statusTextEl.textContent = `erreur : ${data.error}`
      statusEl.classList.remove('connected')
      return
    }

    if (data.connected) {
      statusTextEl.textContent = `connecté (session : ${data.session})`
      statusEl.classList.add('connected')
      qrBox.innerHTML = '<p class="qr-placeholder">Déjà connecté ✓</p>'
      return
    }

    statusTextEl.textContent = `en attente de connexion (session : ${data.session})`
    statusEl.classList.remove('connected')

    if (data.qr) {
      qrBox.innerHTML = `<img src="${data.qr}" alt="QR code de connexion">`
    }
  } catch (e) {
    statusTextEl.textContent = 'serveur injoignable'
    statusEl.classList.remove('connected')
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
      body: JSON.stringify({ phone, session: currentSession() })
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
