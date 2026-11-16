<div align="center">

<img src="./media/logo.jpg" width="180" alt="Logo MZouti Bot">

# MZouti✄Bot

### Bot WhatsApp de base, prêt à tester

**Simple • Rapide • Puissant**

[![JavaScript](https://img.shields.io/badge/JavaScript-Node.js-f7df1e?style=for-the-badge&logo=javascript&logoColor=111111)](https://developer.mozilla.org/docs/Web/JavaScript)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Bot-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://whatsapp.com/)

</div>

---

## 📖 Présentation

**MZouti✄Bot** est un bot WhatsApp de base, prêt à être testé. Il propose plusieurs commandes pour vérifier son fonctionnement, afficher son menu et gérer certaines options liées aux groupes et à son utilisation.

Le bot prend également en charge l'ajout de commandes personnalisées à l'aide de plugins.

## ✨ Commandes disponibles

| Commande | Description | Accès |
|---|---|---|
| `.ping` | Vérifie que le bot répond | Général |
| `.menu` / `.help` | Affiche le menu avec image | Général |
| `.owner` | Affiche la carte de contact du propriétaire | Général |
| `.mzouti` | Présente le bot | Général |
| `.repo` | Affiche les liens officiels : site, chaîne et groupe | Général |
| `.alwaysonline on` / `.alwaysonline off` | Active ou désactive la présence permanente | Propriétaire |
| `.mode public` / `private` / `privad` | Définit qui peut utiliser le bot | Propriétaire |
| `.antilink on` / `.antilink off` | Active ou désactive la suppression des liens dans le groupe | Administrateurs |
| `.welcome on` / `.welcome off` | Active ou désactive le message de bienvenue dans le groupe | Administrateurs |
| `.antiviewonce on` / `.antiviewonce off` | Récupère les messages à vue unique | Propriétaire |
| `.anticall on` / `.anticall off` | Active ou désactive le rejet automatique des appels | Propriétaire |
| `.pair +50900000000` | Génère un code de pairage pour un autre numéro | — |

## 🧰 Installation

### Prérequis

- Node.js
- npm

### Installer les dépendances

```bash
npm install
```

## ⚙️ Configuration

Les paramètres du bot se trouvent dans `config/settings.js` :

| Paramètre | Description |
|---|---|
| `ownerNumber` | Numéro WhatsApp du propriétaire, sans le signe `+` |
| `prefix` | Préfixe des commandes ; valeur par défaut : `.` |
| `mode` | Mode d'utilisation : `public`, `private` ou `privad` |

Les groupes et chaînes à rejoindre peuvent être ajoutés dans `config/autojoin.js`, à l'aide de leur code d'invitation.

L'image utilisée pour le menu doit être placée dans le dossier `media/` sous le nom `logo.jpg`.

## 🚀 Lancer le bot

```bash
npm start
```

Lors du premier lancement, un QR code s'affiche dans le terminal. Il suffit de le scanner depuis WhatsApp, dans la section **Appareils liés**.

Pour utiliser le Pairing Code à la place du QR code, les lignes prévues dans `index.js` doivent être décommentées et le numéro WhatsApp renseigné.

## 🔌 Ajouter une commande avec un plugin

Une nouvelle commande peut être ajoutée en créant un fichier dans le dossier `plugins/`.

Exemple : `plugins/salut.js`

```js
module.exports = {
  command: 'salut',
  handler: async ({ sock, from }) => {
    await sock.sendMessage(from, { text: 'Salut !' })
  }
}
```

Le plugin est chargé automatiquement au démarrage du bot.

## ☁️ Déploiement sur Render

Avant le déploiement, les fichiers de session doivent être protégés.

- Le dossier `database/sessions/` ne doit jamais être publié sur GitHub.
- Ce dossier doit être ajouté au fichier `.gitignore`.
- Sur le plan gratuit de Render, le disque est effacé à chaque redémarrage.
- La session doit donc être sauvegardée ailleurs — dans une base de données ou une variable d'environnement encodée en Base64 — avant une mise en production.

## 🔐 Sécurité des sessions

Les données de session permettent de conserver la connexion WhatsApp. Elles doivent rester privées et ne doivent pas être ajoutées au dépôt GitHub.

---

<div align="center">

**MZOUTI✄BOT**

*Bot WhatsApp de base, prêt à tester.*

</div>
