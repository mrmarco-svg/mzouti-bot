# MZouti✄Bot

Bot WhatsApp de base, prêt à tester.

## Installation

```bash
npm install
```

## Configuration

Modifie `config/settings.js` :
- `ownerNumber` : ton numéro WhatsApp sans le `+` (ex: `50941604864`)
- `prefix` : le préfixe des commandes (par défaut `.`)
- `mode` : `public`, `private` ou `privad`

Modifie `config/autojoin.js` pour ajouter tes groupes et chaînes (juste le code d'invitation).

Ajoute une image `logo.jpg` dans le dossier `media/` pour le menu.

## Lancer le bot

```bash
npm start
```

La première fois, un QR code s'affiche dans le terminal : scanne-le avec
WhatsApp (Appareils liés). Pour utiliser le pairing code à la place,
décommente les lignes prévues dans `index.js` et mets ton numéro.

## Commandes à tester

- `.ping` — vérifie que le bot répond
- `.menu` ou `.help` — affiche le menu avec image
- `.owner` — carte de contact du propriétaire
- `.mzouti` — présentation du bot
- `.repo` — liens officiels (site, chaîne, groupe)
- `.alwaysonline on` / `.alwaysonline off` — présence permanente (owner uniquement)

## Ajouter une commande

Crée un fichier dans `plugins/`, par exemple `plugins/salut.js` :

```js
module.exports = {
  command: 'salut',
  handler: async ({ sock, from }) => {
    await sock.sendMessage(from, { text: 'Salut !' })
  }
}
```

Il sera chargé automatiquement au démarrage.

## Important avant le déploiement sur Render

- Ne mets jamais `database/sessions/` sur GitHub (ajoute-le à `.gitignore`)
- Sur le plan gratuit de Render, le disque est effacé à chaque redémarrage :
  prévois de sauvegarder la session ailleurs (base de données ou variable
  d'environnement en base64) avant de mettre le bot en production.
