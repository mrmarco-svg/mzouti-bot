// Convertit un texte normal en police italique mathématique (𝑎𝑏𝑐...)
// Exemple : toItalic("Menu") -> "𝑀𝑒𝑛𝑢"

const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lower = 'abcdefghijklmnopqrstuvwxyz'
const digits = '0123456789'

const italicUpperStart = 0x1D434 // 𝐴
const italicLowerStart = 0x1D44E // 𝑎

function toItalic(text = '') {
  let out = ''
  for (const ch of text) {
    const upIdx = upper.indexOf(ch)
    const lowIdx = lower.indexOf(ch)
    if (upIdx !== -1) {
      out += String.fromCodePoint(italicUpperStart + upIdx)
    } else if (lowIdx !== -1) {
      out += String.fromCodePoint(italicLowerStart + lowIdx)
    } else {
      out += ch // garde les chiffres, espaces et symboles tels quels
    }
  }
  return out
}

// Construit un bloc de menu stylé avec puces et symboles
function menuLine(texte, puce = '✄') {
  return `${puce} ${toItalic(texte)}`
}

module.exports = { toItalic, menuLine }
