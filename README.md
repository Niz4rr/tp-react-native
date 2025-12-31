# MonApp (Expo + React Navigation)

## Création du projet

1. Créer le projet Expo :

```bash
npx create-expo-app MonApp --template
# choisir: blank
cd MonApp
```

2. Installer React Navigation et dépendances :

```bash
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install @react-navigation/bottom-tabs
expo install react-native-screens react-native-safe-area-context
expo install @expo/vector-icons
```

## Fichiers clés

- `App.js` : configuration de la navigation (Stack + Tabs) + `AppBar` et `SafeAreaView`.
- `screens/HomeScreen.js` : écran d'accueil.
- `screens/DetailsScreen.js` : écran de détails (reçoit `route.params.id`).
- `screens/SettingsScreen.js` : écran paramètres.
- `screens/Appbar.js` : barre d'app personnalisée.

## Lancer l'application

```bash
npm start
# scanner le QR code avec Expo Go
```

## Personnalisation

- Personnaliser `Tab.Navigator` via `screenOptions` (couleurs, style, icônes).
- Modifier le style des headers dans `Stack.Screen` via la prop `options`.

## Remarques

- Si vous utilisez un simulateur iOS/Android : `i` ou `a` depuis le menu Expo.
- Assurez-vous d'avoir installé les dépendances listées ci-dessus avant de lancer.
