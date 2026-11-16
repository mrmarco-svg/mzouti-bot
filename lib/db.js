const fs = require('fs')
const path = require('path')

const DB_DIR = path.join(__dirname, '..', 'database')
const GROUPS_FILE = path.join(DB_DIR, 'groups.json')
const SETTINGS_FILE = path.join(DB_DIR, 'settings.json')

function readJSON(file, fallback) {
  try {
    if (!fs.existsSync(file)) return fallback
    return JSON.parse(fs.readFileSync(file, 'utf-8'))
  } catch (e) {
    return fallback
  }
}

function writeJSON(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, JSON.stringify(data, null, 2))
}

// --- Réglages par groupe (antilink, welcome, avertissements) ---
function getGroup(id) {
  const groups = readJSON(GROUPS_FILE, {})
  if (!groups[id]) {
    groups[id] = { antilink: false, welcome: false, warnings: {} }
    writeJSON(GROUPS_FILE, groups)
  }
  return groups[id]
}

function saveGroup(id, data) {
  const groups = readJSON(GROUPS_FILE, {})
  groups[id] = data
  writeJSON(GROUPS_FILE, groups)
}

// --- Réglages globaux (antiviewonce, anticall) ---
function getSettings() {
  return readJSON(SETTINGS_FILE, { antiviewonce: false, anticall: false })
}

function saveSettings(data) {
  writeJSON(SETTINGS_FILE, data)
}

module.exports = { getGroup, saveGroup, getSettings, saveSettings }
