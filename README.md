# CRUD Capteurs IoT

Projet fullstack démontrant un CRUD sur une entité `CapteurConnecte` avec backend Spring Boot, frontend React et persistance PostgreSQL.

## ✅ Objectif
- Réaliser un CRUD complet sur une entité métier
- Présenter une architecture claire backend/frontend
- Montrer validation, gestion d’erreurs, API REST et interface utilisateur
- Ajouter de la documentation via Swagger

## 🧱 Architecture
- `back/` : Spring Boot + JPA + validation
- `front/` : React + Vite + Axios
- `docker-compose.yml` : PostgreSQL + backend + frontend
- `back/src/main/java/habib/diao/back/model/CapteurConnecte/CapteurConnecte.java` : entité principale

## 🌟 Fonctionnalités principales
- Création, lecture, mise à jour, suppression de capteurs
- Validation métier côté backend
- `reference` unique et `valeurSeuil` bornée entre -50 et 100
- API REST avec statuts HTTP appropriés
  - `201 Created` pour POST
  - `200 OK` pour GET / PUT
  - `204 No Content` pour DELETE
- Interface React simple et responsive
- Documentation Swagger disponible

## 🚀 Démarrage rapide
### Avec Docker
```bash
cd "c:\Users\bmd\OneDrive\Desktop\notes cours\crud-Capteurs_IOT"
docker-compose up --build
```

### En développement local
#### Backend
```bash
cd back
# Windows PowerShell
./mvnw.cmd spring-boot:run
# ou Git Bash / Linux
./mvnw spring-boot:run
```

#### Frontend
```bash
cd front
npm install
npm run dev
```

## 🔌 API
Base : `http://localhost:8080/api/capteurs`

- `GET /api/capteurs`
- `GET /api/capteurs/{id}`
- `POST /api/capteurs`
- `PUT /api/capteurs/{id}`
- `DELETE /api/capteurs/{id}`

## 📘 Documentation Swagger
Après démarrage du backend, Swagger UI est disponible à :

`http://localhost:8080/swagger-ui/index.html`

Le schéma OpenAPI brut est également accessible à :

`http://localhost:8080/v3/api-docs`

> Le backend autorise désormais les requêtes CORS vers Swagger depuis `localhost` et `127.0.0.1` pour le développement local.

## 🔧 Points techniques à mettre en valeur
- Séparation controller / service / repository
- Validation Spring + gestion centralisée des erreurs
- CORS configuré pour le développement local
- Axios configuré via variable d’environnement Vite
- Composants React factorisés pour rendre le code plus lisible

## 🎯 Améliorations possibles
- Ajouter des tests unitaires et d’intégration
- Utiliser des DTO pour séparer entité et API
- Ajouter authentification et gestion de rôles
- Externaliser le style CSS dans des fichiers dédiés
- Ajouter un fichier `README` de déploiement plus complet

## 📍 Remarque
Le projet est conçu pour être présenté simplement en entretien : il montre une base back-front robuste, une API bien structurée et une interface fonctionnelle.
