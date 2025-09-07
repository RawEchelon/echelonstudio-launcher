# 📦 Système de Modpacks EchelonStudio

## Vue d'ensemble

Le launcher EchelonStudio inclut maintenant un système complet de gestion de modpacks Minecraft qui permet aux utilisateurs de créer, publier et installer des modpacks personnalisés.

## 🚀 Fonctionnalités

### 📝 Création de Modpacks
- Interface intuitive pour créer des modpacks
- Gestion des métadonnées (nom, version, description, auteur)
- Support des versions Minecraft et Forge
- Ajout de mods avec informations détaillées
- Validation des champs obligatoires

### 🏪 Navigation des Modpacks
- Liste de tous les modpacks disponibles
- Affichage des informations détaillées
- Compteur de téléchargements
- Installation en un clic
- Système de recherche et filtrage

### 💾 Stockage et API
- API REST complète pour la gestion des modpacks
- Stockage en fichiers JSON (extensible vers base de données)
- Endpoints sécurisés avec validation
- Support des opérations CRUD

## 🛠️ Architecture Technique

### Backend (Node.js + Express)
```
server/
├── index.js          # Serveur principal avec API REST
└── ../data/          # Stockage des données modpacks
    └── modpacks.json  # Base de données JSON
```

**Endpoints API:**
- `GET /api/modpacks` - Lister tous les modpacks
- `POST /api/modpacks` - Créer un nouveau modpack
- `GET /api/modpacks/:id` - Récupérer un modpack spécifique
- `PATCH /api/modpacks/:id` - Mettre à jour un modpack
- `DELETE /api/modpacks/:id` - Supprimer un modpack

### Frontend (React + TypeScript)
```
client/src/
├── components/
│   ├── ModpackBrowser.tsx    # Interface de navigation
│   └── ModpackCreator.tsx    # Interface de création
├── App.tsx                   # Application principale
└── index.css                # Styles Tailwind
```

### Electron Integration
```
electron/
├── main.js          # Processus principal Electron
└── preload.js       # Bridge sécurisé renderer/main
```

## 📊 Structure des Données

### Modpack
```typescript
interface Modpack {
  id: string;                    // Identifiant unique
  name: string;                  // Nom du modpack
  version: string;               // Version du modpack
  description: string;           // Description
  minecraftVersion: string;      // Version Minecraft requise
  forgeVersion?: string;         // Version Forge (optionnel)
  mods: ModInfo[];              // Liste des mods
  author: string;               // Auteur du modpack
  createdAt: string;            // Date de création
  downloads: number;            // Nombre de téléchargements
}
```

### Mod Info
```typescript
interface ModInfo {
  name: string;                 // Nom du mod
  version?: string;             // Version du mod
  source?: string;              // Source (curseforge, modrinth, url, local)
  id?: string;                  // ID sur la plateforme source
  url?: string;                 // URL de téléchargement direct
  fileName?: string;            // Nom du fichier
  required: boolean;            // Mod obligatoire ou optionnel
}
```

## 🚀 Installation et Utilisation

### 1. Installation des dépendances
```bash
npm install
```

### 2. Démarrage du serveur
```bash
npm run server
```

### 3. Démarrage du client web
```bash
npm run client
```

### 4. Application Electron complète
```bash
npm run build
npm run electron
```

## 🔄 Flux d'utilisation

### Création d'un Modpack
1. Cliquer sur "Create Modpack" dans l'interface
2. Remplir les informations de base (nom, version, MC version)
3. Ajouter les mods un par un avec leurs détails
4. Sauvegarder le modpack

### Installation d'un Modpack
1. Naviguer dans "Browse Modpacks"
2. Sélectionner le modpack désiré
3. Cliquer sur "Install Modpack"
4. Le launcher télécharge et installe automatiquement

## 🔧 Fonctionnalités Avancées

### Version Web vs Electron
- **Version Web**: Navigation et création des modpacks
- **Version Electron**: Fonctionnalités complètes + installation réelle

### Extensibilité
- Support prévu pour CurseForge/Modrinth API
- Système de cache des téléchargements
- Gestion des profils de lancement
- Synchronisation cloud des modpacks

## 📈 Prochaines Améliorations

- [ ] Intégration CurseForge/Modrinth API
- [ ] Téléchargement automatique des mods
- [ ] Système de cache intelligent
- [ ] Interface de gestion des profils
- [ ] Synchronisation cloud
- [ ] Support des modpacks zippés
- [ ] Système de versions et mises à jour

## 🐛 Débogage

### Logs du serveur
Le serveur affiche les logs de toutes les requêtes API pour faciliter le débogage.

### Données de test
Un modpack de test est créé automatiquement pour valider le système.

### Vérification API
```bash
# Lister les modpacks
curl http://localhost:3001/api/modpacks

# Créer un modpack
curl -X POST http://localhost:3001/api/modpacks \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","version":"1.0","minecraftVersion":"1.19.2"}'
```

---

*Système développé pour faciliter le partage et l'installation de modpacks dans la communauté Minecraft française.*