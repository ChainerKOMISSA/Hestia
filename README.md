# Hestia

> **Hestia** est l'assistant numérique du foyer familial - du choix du dîner à la gestion des tâches de la maison, tout en un seul écran partagé.

---

## Vision

Inspirée de la déesse grecque du foyer et de la vie familiale, **Hestia** centralise l'organisation du quotidien dans une interface simple, belle et participative.

L'objectif est de créer un véritable **hub familial interactif** : installé sur un écran partagé dans le couloir ou la cuisine, il permet à chaque membre de la famille de s'impliquer dans les décisions du foyer — commencer par le dîner du soir, et bien plus à venir.

---

## Stack technique

| Couche | Technologie |
|---|---|
| Frontend | React + shadcn/ui |
| Backend | Node.js + Express.js |
| Routage serveur | File-based routing (Express) |
| Style | Tailwind CSS |
| Base de données | Mysql |

---

## Fonctionnalités V1 : Votes pour le dîner

### Côté Famille (écran d'affichage)

- Affichage du jour et de la date
- Liste des plats proposés avec photo, nom et description courte
- **Vote en un clic** sur un plat
- Barres de progression dynamiques affichant les pourcentages **en temps réel**
- Affichage automatique du plat gagnant en fin de journée

### Côté Admin (via la sidebar)

- Ajouter un plat (nom, image, description, catégorie, tags)
- Assigner des plats à un jour de la semaine
- Modifier ou supprimer un plat
- Voir l'historique des votes (quel plat a gagné chaque jour)
- Remettre les votes à zéro
- Gérer les membres de la famille (nom, avatar, code couleur)
- Personnalisation de l'affichage (thème clair/sombre, couleurs, police)

---

##  Roadmap

```
v1 — Votes dîner         ✅ En cours
v2 — Tâches ménagères    🔜 Liste de tâches assignables par membre
v3 — Courses & budget    🔜 Liste de courses collaborative
v4 — Calendrier familial 🔜 Événements, rappels, anniversaires
v5 — Hub complet         🔜 Tableau de bord centralisé
```

---

*Hestia, parce que chaque foyer mérite son assistant.*
