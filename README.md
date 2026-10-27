# Morpion

Un jeu de morpion en français pour deux personnes sur le même appareil. Les croix commencent ; alignez trois symboles horizontalement, verticalement ou en diagonale. Le bouton « Nouvelle partie » réinitialise la grille.

## Démarrer

Prérequis : Python 3 pour le serveur local, Node.js 18 ou supérieur pour les tests. Aucune dépendance à installer.

Depuis `/workspace/morpion` :

```sh
npm start
```

Le serveur écoute sur le port 3000. On peut aussi utiliser directement `python3 -m http.server 3000 --bind 0.0.0.0`.

## Tester

```sh
npm test
```

Les tests couvrent les huit alignements gagnants, l’alternance des tours, les coups invalides, les matchs nuls et le blocage en fin de partie.

L’application utilise HTML, CSS et JavaScript natifs, sans compilation ni service externe.
