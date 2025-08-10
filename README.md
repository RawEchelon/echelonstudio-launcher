# 🎮 EchelonStudio - Minecraft Launcher

Un launcher Minecraft moderne conçu spécifiquement pour les serveurs français **FroziaMc** et **DrakkarMC**.

## ✨ Fonctionnalités

### 🎯 Launcher Principal
- **Multi-instances** - Gestion de profils séparés pour chaque serveur
- **Authentification** - Support Microsoft et comptes crack
- **Lancement automatique** - Connexion directe aux serveurs configurés
- **Gestion des mods** - Installation et mise à jour automatique

### 🌟 Interface Moderne
- **Design SnowballUI** - Interface cyan/blue avec effets visuels
- **Thème serveur** - Couleurs adaptées (Frozia bleu glacé, Drakkar or pirate)
- **Responsive** - Fonctionne sur desktop et mobile
- **Animations** - Effets de particules et transitions fluides

### 🛒 Boutique Intégrée
- **Intégration Tebex** - Achat de gems directement dans le launcher
- **Gems système** - Monnaie virtuelle pour les serveurs
- **Interface unifiée** - Achats sans quitter l'application

### 📰 Actualités
- **News automatiques** - Récupération depuis les serveurs
- **Discord webhook** - Publication automatique des annonces
- **Timeline** - Historique des événements serveurs

## 🚀 Installation

### Version Desktop (Recommandée)

```bash
# Cloner le projet
git clone https://github.com/TON_USERNAME/echelonstudio-launcher.git
cd echelonstudio-launcher

# Installer les dépendances
npm install
npm install electron electron-builder --save-dev

# Lancer l'application desktop
npm run build
npm run electron
```

### Version Web (Aperçu)

L'application est également disponible en version web sur :
**https://echelonstudio.replit.app**

> Note: La version web ne peut pas lancer Minecraft - utilisez la version desktop pour les fonctionnalités complètes.

## 🛠️ Développement

### Architecture

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express
- **Desktop**: Electron pour l'application native
- **Base de données**: SQLite (desktop) / PostgreSQL (web)
- **UI**: shadcn/ui + Radix UI

### Scripts disponibles

```bash
npm run dev          # Développement web
npm run build        # Build production
npm run electron     # Lancer app desktop
npm run electron:build # Compiler app desktop
```

### Structure du projet

```
echelonstudio-launcher/
├── client/          # Interface React
├── server/          # Backend Node.js
├── electron/        # Application desktop
├── shared/          # Types partagés
└── data/           # Données et configurations
```

## 🎮 Serveurs Supportés

### FroziaMc
- **Thème**: Magie de glace et arctique
- **Mods**: Collection de mods magic/ice
- **Couleur**: Bleu glacé (#06B6D4)

### DrakkarMC
- **Thème**: Aventures pirates et océan
- **Mods**: Exploration maritime et pirates
- **Couleur**: Or pirate (#F59E0B)

### Vanilla
- **Support**: Minecraft vanilla standard
- **Flexibilité**: Profils personnalisables

## 📋 Prochaines Fonctionnalités

- [ ] **Détection Java** - Scan automatique des installations
- [ ] **Download Manager** - Téléchargement versions Minecraft
- [ ] **Mod Manager** - Installation depuis Modrinth/CurseForge
- [ ] **Launcher Core** - Système de lancement complet
- [ ] **Base de données locale** - Stockage profils et configurations
- [ ] **Sync cloud** - Sauvegarde profils en ligne

## 🤝 Contribution

1. Fork le projet
2. Crée une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit tes changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvre une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 💬 Support

- **Discord FroziaMc**: [Lien Discord]
- **Discord DrakkarMC**: [Lien Discord]
- **Issues GitHub**: Pour les bugs et suggestions

---

*Créé avec ❤️ pour la communauté Minecraft française*