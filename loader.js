const fs = require('fs')
const path = require('path')

// Charge tous les fichiers .js du dossier plugins/ et retourne
// un objet { commande: moduleDuPlugin }
function loadPlugins() {
  const pluginsDir = path.join(__dirname, '..', 'plugins')
  const commands = {}

  const files = fs.readdirSync(pluginsDir).filter(f => f.endsWith('.js'))

  for (const file of files) {
    try {
      const plugin = require(path.join(pluginsDir, file))
      if (!plugin.command || !plugin.handler) {
        console.log(`⚠️  Plugin ignoré (incomplet) : ${file}`)
        continue
      }
      const commandNames = Array.isArray(plugin.command) ? plugin.command : [plugin.command]
      for (const name of commandNames) {
        commands[name.toLowerCase()] = plugin
      }
      console.log(`✓ Plugin chargé : ${file}`)
    } catch (e) {
      console.log(`✗ Erreur de chargement (${file}) :`, e.message)
    }
  }

  return commands
}

module.exports = { loadPlugins }
