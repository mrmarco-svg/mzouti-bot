<div align="center">

<img src="./media/logo.jpg" width="180" alt="Logo MZouti Bot">

# 👑 MZouti✄Bot

### Votre assistant WhatsApp intelligent

**Simple • Rapide • Puissant**

[![JavaScript](https://img.shields.io/badge/JavaScript-Node.js-f7df1e?style=for-the-badge&logo=javascript&logoColor=111111)](https://developer.mozilla.org/docs/Web/JavaScript)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Bot-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://whatsapp.com/)
[![Owner](https://img.shields.io/badge/Owner-Mr%20Marco-00d66b?style=for-the-badge)](https://github.com/mrmarco-svg)
[![Country](https://img.shields.io/badge/Made%20in-Haiti-blue?style=for-the-badge)](https://mzouti.onrender.com)

*Plus qu'un bot… un assistant intelligent !*

</div>

---

## 📸 Aperçu

<div align="center">

<img src="./media/welcome.jpg" width="100%" alt="Présentation de MZouti Bot">

</div>

> Les images sont chargées depuis le dossier `media/`. Si tu utilises un dossier `Media/` avec une majuscule, adapte les chemins dans ce README : GitHub distingue les majuscules et les minuscules.

## 📖 Présentation

**MZouti✄Bot** est un bot WhatsApp développé pour proposer des outils pratiques de gestion et d'automatisation des conversations et des groupes.

Le projet est organisé autour de commandes et de plugins afin de faciliter l'ajout de nouvelles fonctionnalités et la personnalisation de la configuration.

### 🎯 Objectifs

- Simplifier certaines tâches de gestion des groupes.
- Proposer des commandes faciles à utiliser.
- Permettre l'ajout de plugins.
- Offrir plusieurs modes d'utilisation.
- Centraliser les informations et les outils MZOUTI.

## ✨ Fonctionnalités documentées

| Fonction | Commande | Description / accès |
|---|---|---|
| Ping | `.ping` | Vérifie que le bot répond |
| Menu | `.menu` / `.help` | Affiche le menu avec image |
| Owner | `.owner` | Affiche la carte du propriétaire |
| Présentation | `.mzouti` | Présente MZouti Bot |
| Repository | `.repo` | Affiche les liens officiels |
| Always Online | `.alwaysonline on/off` | Active ou désactive la présence permanente — propriétaire |
| Mode | `.mode public/private/privad` | Définit qui peut utiliser le bot — propriétaire |
| AntiLink | `.antilink on/off` | Supprime les liens dans le groupe — administrateurs |
| Welcome | `.welcome on/off` | Active ou désactive l'accueil dans le groupe — administrateurs |
| AntiViewOnce | `.antiviewonce on/off` | Fonction de gestion des messages à vue unique — propriétaire |
| AntiCall | `.anticall on/off` | Active ou désactive le rejet automatique des appels — propriétaire |
| Pairing | `.pair +509XXXXXXXX` | Demande un code de pairage pour un numéro |

**Remarque :** cette liste reprend les commandes décrites dans le README de départ. Leur disponibilité réelle dépend du code présent dans le dépôt et de sa configuration.

## 🧰 Prérequis

Avant l'installation, prépare :

- Node.js compatible avec les dépendances du projet.
- npm.
- Git.
- Un compte WhatsApp pour l'association de l'appareil.
- Un terminal (Windows PowerShell, macOS, Linux ou Termux).

Vérifie les installations :

```bash
node --version
npm --version
git --version
```

## ⚡ Installation

### 1. Récupérer le projet

Si le dépôt est déjà publié sur GitHub :

```bash
git clone https://github.com/mrmarco-svg/NOM-DU-DEPOT.git
```

Remplace `NOM-DU-DEPOT` par le nom exact du dépôt GitHub.

### 2. Entrer dans le dossier

```bash
cd NOM-DU-DEPOT
```

### 3. Installer les dépendances

```bash
npm install
```

### 4. Configurer le bot

Ouvre le fichier :

```text
config/settings.js
```

Renseigne notamment les paramètres suivants :

| Paramètre | Description |
|---|---|
| `ownerNumber` | Numéro WhatsApp du propriétaire, sans `+` |
| `prefix` | Préfixe des commandes ; valeur par défaut : `.` |
| `mode` | Mode `public`, `private` ou `privad` |

Exemple de numéro du propriétaire :

```js
ownerNumber: "50941605864"
```

Conserve la syntaxe et les noms de propriétés déjà présents dans ton fichier `settings.js` lorsque tu modifies la configuration.

### 5. Configurer les groupes et chaînes

Ouvre :

```text
config/autojoin.js
```

Ajoute les codes d'invitation des groupes et chaînes que le projet doit rejoindre, selon le format attendu par ce fichier.

### 6. Ajouter le logo du menu

Place l'image du logo à cet emplacement :

```text
media/logo.jpg
```

### 7. Démarrer le bot

```bash
npm start
```

## 🔐 Connexion WhatsApp

### Connexion par QR code

1. Lance le bot avec `npm start`.
2. Attends l'affichage du QR code dans le terminal.
3. Ouvre WhatsApp sur ton téléphone.
4. Va dans **Appareils liés**.
5. Choisis **Lier un appareil**.
6. Scanne le QR code affiché.

### Connexion par Pairing Code

Le README initial indique qu'un mode Pairing Code peut être activé depuis les lignes prévues dans `index.js`.

1. Ouvre `index.js`.
2. Repère les lignes prévues pour le Pairing Code.
3. Active-les selon les commentaires du code.
4. Renseigne le numéro WhatsApp au format international attendu.
5. Redémarre le bot et suis les instructions du terminal.

La commande `.pair +509XXXXXXXX` est également documentée dans le projet. Le résultat dépend de l'implémentation effective de cette commande.

> Ne partage jamais ton QR code, ton Pairing Code ou les fichiers de session. Toute personne qui y accède pourrait prendre le contrôle de la session WhatsApp liée.

## 💬 Commandes

### Commandes générales

| Commande | Action |
|---|---|
| `.ping` | Tester la réponse du bot |
| `.menu` | Afficher le menu |
| `.help` | Afficher l'aide |
| `.owner` | Afficher les informations du propriétaire |
| `.mzouti` | Afficher la présentation |
| `.repo` | Afficher les liens officiels |

### Commandes du propriétaire

| Commande | Action |
|---|---|
| `.alwaysonline on` | Activer la présence permanente |
| `.alwaysonline off` | Désactiver la présence permanente |
| `.mode public` | Autoriser l'utilisation publique |
| `.mode private` | Réserver l'utilisation au propriétaire |
| `.mode privad` | Mode privé selon les règles définies par le bot |
| `.antiviewonce on/off` | Activer ou désactiver la fonction |
| `.anticall on/off` | Activer ou désactiver le rejet des appels |

### Commandes de groupe

| Commande | Action |
|---|---|
| `.antilink on` | Activer la suppression des liens |
| `.antilink off` | Désactiver la suppression des liens |
| `.welcome on` | Activer le message de bienvenue |
| `.welcome off` | Désactiver le message de bienvenue |

Les commandes de groupe nécessitent les droits administrateur appropriés. Le bot doit également disposer des permissions WhatsApp nécessaires pour effectuer les actions demandées.

### Pairing

```text
.pair +509XXXXXXXX
```

Remplace le numéro d'exemple par le numéro à associer. Ne publie jamais le code de pairage obtenu.

## 🧩 Ajouter une commande avec un plugin

Le README initial décrit un chargement automatique des fichiers présents dans `plugins/`.

Exemple : crée `plugins/salut.js` :

```js
module.exports = {
  command: 'salut',
  handler: async ({ sock, from }) => {
    await sock.sendMessage(from, {
      text: 'Salut !'
    })
  }
}
```

Enregistre le fichier, puis redémarre le bot si le chargeur de plugins ne prend pas en charge le rechargement à chaud.

**Conseils pour les plugins :**

- Utilise un nom de fichier explicite.
- Évite de dupliquer les noms de commandes.
- Vérifie les permissions avant toute action d'administration.
- Gère les erreurs asynchrones.
- Ne place jamais de mot de passe, jeton ou donnée de session dans un plugin public.

## 🗂️ Organisation du projet

Les chemins ci-dessous sont ceux mentionnés dans la documentation initiale. La structure exacte doit rester alignée sur les dossiers réellement présents dans le dépôt.

```text
mzouti-bot/
├── index.js
├── package.json
├── config/
│   ├── settings.js
│   └── autojoin.js
├── plugins/
│   ├── ping.js
│   ├── menu.js
│   ├── owner.js
│   ├── mzouti.js
│   └── repo.js
├── media/
│   ├── logo.jpg
│   ├── welcome.jpg
│   └── owner.jpg
├── database/
│   └── sessions/
├── README.md
└── .gitignore
```

Certains éléments de cette arborescence sont des emplacements recommandés pour organiser les ressources ; vérifie leur présence dans ton projet avant de les considérer comme déjà implémentés.

## 🖼️ Ressources visuelles

| Fichier | Utilisation |
|---|---|
| `media/logo.jpg` | Logo utilisé par le menu |
| `media/welcome.jpg` | Bannière de présentation |
| `media/owner.jpg` | Carte du propriétaire |
| `media/connect.jpg` | Visuel explicatif de connexion, si utilisé |

Les QR codes et Pairing Codes doivent être générés au moment de la connexion. Ne les intègre pas de façon permanente dans une image publique.

## 🚀 Déploiement sur Render

Avant de déployer :

1. Vérifie que `npm install` fonctionne localement.
2. Vérifie que `npm start` démarre correctement le bot.
3. Configure les variables d'environnement nécessaires si le code en utilise.
4. Vérifie la méthode de conservation de la session WhatsApp.
5. Consulte les journaux après le démarrage.

### ⚠️ Attention aux sessions

Le README initial signale que, sur le plan gratuit de Render, le disque local peut être perdu lors d'un redémarrage ou d'un remplacement d'instance.

- Ne publie jamais `database/sessions/` sur GitHub.
- Ajoute les fichiers de session au `.gitignore`.
- Prévois une solution de persistance adaptée avant une utilisation durable.
- Ne stocke pas une session en clair dans le dépôt.
- Protège toute sauvegarde de session comme un secret.

Exemple de `.gitignore` :

```gitignore
node_modules/
.env
database/sessions/
*.log
.DS_Store
```

La persistance réelle dépend de l'architecture et du stockage configurés sur Render ; un simple déploiement ne garantit pas la conservation de la session.

## 🛡️ Sécurité et utilisation responsable

- Utilise uniquement un compte WhatsApp que tu es autorisé à associer.
- Protège les QR codes, Pairing Codes et données de session.
- Limite les commandes sensibles au propriétaire ou aux administrateurs autorisés.
- Respecte la vie privée des membres et les règles des groupes.
- N'utilise pas le bot pour harceler, spammer ou contourner les choix de confidentialité.
- Vérifie les règles et conditions applicables de WhatsApp avant de déployer le bot.

## 🌐 Liens officiels

| Ressource | Lien |
|---|---|
| Site MZouti Bot | https://mzouti-bot.onrender.com |
| Plateforme MZOUTI | https://mzouti.onrender.com |
| Chaîne WhatsApp | https://whatsapp.com/channel/0029Vb9JiTZ8qIzvgKbVGB36 |
| Groupe WhatsApp | https://chat.whatsapp.com/DVGIgkU4SQpKL3rYttjXfs?s=cl&p=a&iam=2 |
| Profil GitHub | https://github.com/mrmarco-svg |

## 👑 Propriétaire

<div align="center">

<img src="./media/owner.jpg" width="220" alt="Mr Marco — propriétaire de MZouti Bot">

### Mr Marco 🇭🇹

**Créateur et propriétaire de MZouti✄Bot**

WhatsApp : **+509 41605864**

[Site officiel](https://mzouti-bot.onrender.com) · [MZOUTI](https://mzouti.onrender.com) · [GitHub](https://github.com/mrmarco-svg)

</div>

## 🤝 Contributions

Les contributions et suggestions sont les bienvenues.

Avant de proposer une modification :

1. Explique clairement le problème ou l'amélioration.
2. Vérifie que la modification ne casse pas les commandes existantes.
3. Teste le bot dans un environnement séparé.
4. N'inclus aucune session, clé ou donnée privée dans ta contribution.

## 📜 Licence

Aucun type de licence n'est confirmé dans le README initial. Ajoute un fichier `LICENSE` à la racine du dépôt et indique ici la licence réellement choisie avant de présenter le projet comme open source.

---

<div align="center">

**👑 MZOUTI✄BOT**

*Plus qu'un bot… un assistant intelligent !*

Développé avec soin par **Mr Marco** 🇭🇹

**Merci d'utiliser MZouti✄Bot ! 💚**

</div>
