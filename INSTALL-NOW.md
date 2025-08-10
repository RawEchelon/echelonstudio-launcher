# 🚀 Comment obtenir l'application EchelonStudio

## Option 1 : Application Desktop Complète (RECOMMANDÉ pour ton cas)

Tu as besoin d'une vraie app desktop pour la base de données et le lancement Minecraft. Voici comment l'obtenir :

### Sur ton ordinateur local :

1. **Clone ce projet** :
   ```bash
   git clone https://replit.com/github.com/ton-username/echelonstudio
   cd echelonstudio
   ```

2. **Installe les dépendances** :
   ```bash
   npm install
   npm install electron electron-builder --save-dev
   ```

3. **Construis l'application** :
   ```bash
   npm run build
   npx electron-builder --dir
   ```

4. **Lance l'app desktop** :
   ```bash
   npm run electron
   ```

### Avantages de l'app desktop :
- ✅ Base de données SQLite locale
- ✅ Lancement direct de Minecraft
- ✅ Accès complet aux fichiers
- ✅ Gestion des mods et instances
- ✅ Fonctionne hors ligne
- ✅ Performances natives

## Option 2 : Version Web (Temporaire)

En attendant de compiler l'app desktop :
**https://echelonstudio.replit.app**

Cette version web fonctionne parfaitement mais n'aura pas accès à :
- La base de données locale
- Le lancement direct de Minecraft
- La gestion des fichiers de jeu

## Prochaines étapes pour ton projet

1. **✅ Interface complète** - Terminé
2. **✅ Application desktop** - Prêt à compiler
3. **🔄 Base de données locale** - Prochaine étape
4. **🔄 API Minecraft** - Intégration Java launcher
5. **🔄 Gestionnaire de mods** - Téléchargement automatique

## Pourquoi pas juste l'app web ?

Tu as raison de vouloir une vraie app desktop car :
- L'app web ne peut pas lancer Minecraft
- Pas d'accès aux dossiers `.minecraft`
- Limitations de stockage navigateur
- Pas d'intégration système

Une fois ton app desktop compilée, on pourra intégrer :
- Base de données SQLite pour les comptes
- API Java pour lancer Minecraft
- Gestionnaire de fichiers pour les mods
- Système de notifications natives