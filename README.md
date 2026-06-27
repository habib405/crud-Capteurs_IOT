📌 Vision du Projet

Ce projet est une application Full Stack de gestion et supervision de capteurs IoT. Au-delà du développement de l'application métier (CRUD interactif), l'objectif d'ingénierie principal est l'implémentation d'une culture DevSecOps. L'architecture a été pensée pour être découplée, sécurisée by-design et entièrement automatisée de bout en bout vers le cloud AWS.

💻 1. DEV : Développement & Architecture Logicielle

La couche applicative repose sur une architecture en micro-services (Backend / Frontend / Base de données) garantissant la séparation des responsabilités.

Stack Technique

Frontend (UI) : Application Single Page développée en React.js (via Vite pour des temps de build optimisés), consommant l'API de manière asynchrone (Axios/Fetch).

Backend (API) : Java avec Spring Boot 3. L'API REST est structurée selon les principes de la Clean Architecture (Controllers, Services, Repositories).

Base de données : PostgreSQL 15, garantissant les propriétés ACID nécessaires à l'intégrité des données des capteurs industriels.

Qualité du Code

Validation stricte : Utilisation des annotations de validation Jakarta (@Valid, @NotNull) pour rejeter les payloads malformés dès l'entrée des contrôleurs.

Typage fort : Utilisation avancée de Java 17 et de la modélisation objet pour représenter fidèlement l'état des capteurs connectés.

🛠️ Démarrage Local

git clone [https://github.com/habibdiao405/crud-Capteurs_IOT.git](https://github.com/habibdiao405/crud-Capteurs_IOT.git)
cd crud-Capteurs_IOT
docker compose up -d


L'interface sera accessible sur http://localhost:80 et l'API sur http://localhost:8080.

🛡️ 2. SEC : Sécurité Numérique & Réseau

La sécurité a été intégrée à tous les niveaux de l'infrastructure, du code jusqu'au pare-feu cloud.

Politique CORS stricte : Implémentation d'une configuration globale centralisée (CorsConfig). Utilisation de allowedOriginPatterns pour autoriser exclusivement le domaine applicatif AWS et bloquer les requêtes inter-sites malveillantes (CSRF).

Surface d'attaque réduite (Alpine Linux) : Conteneurisation du backend et de la base de données via des images Docker basées sur Alpine Linux. Cela réduit le poids des images (optimisation CI/CD) et minimise les vecteurs de vulnérabilités (CVEs) en éliminant les paquets OS inutiles.

Gestion des Secrets (Zero Trust) : Aucun mot de passe ni clé d'API n'est hardcodé. L'authentification à Docker Hub et au serveur AWS se fait via les variables d'environnement chiffrées de GitHub Secrets.

Pare-feu Cloud (Security Groups AWS) : Isolation du réseau avec une stratégie de moindre privilège. Ouverture chirurgicale du port HTTP (80) pour l'UI, du port (8080) pour l'API REST, et sécurisation du port SSH (22) via des clés asymétriques.

🚀 3. OPS : Opérations, CI/CD & Cloud

Le cycle de vie du projet est entièrement géré par l'approche Infrastructure as Code et l'automatisation.

Pipeline d'Intégration et Déploiement Continus (CI/CD)

Un workflow GitHub Actions orchestre le déploiement. À chaque push sur la branche principale :

Build : Compilation de l'API Java et du build de production React.

Containerization : Création des images et Push vers le registre Docker Hub public.

Delivery : Connexion automatisée via SSH à l'instance Cloud.

Deploy : Exécution d'un docker compose pull et redémarrage sans interruption de service.

Infrastructure Cloud AWS

Hébergement : Instance EC2 (Ubuntu 24.04 LTS) gérant les requêtes de production.

Orchestration : Choix de Docker Compose en production pour respecter les contraintes matérielles de la machine virtuelle (1 Go de RAM). Cela offre un excellent compromis entre isolation logicielle et légèreté (là où Kubernetes aurait consommé trop de ressources).

Persistance des données : Utilisation de volumes Docker nommés (postgres-data) connectés au système de fichiers de l'hôte EC2 pour garantir la pérennité des données de la base PostgreSQL, même lors des mises à jour des conteneurs.

📈 4. Axes d'Amélioration & Perspectives

Bien que cette architecture réponde aux exigences initiales, plusieurs évolutions sont envisageables pour une mise en production à grande échelle (Scale-up) :

[DEV] Intégration IoT Temps Réel : Remplacement des requêtes HTTP classiques par le protocole MQTT ou des WebSockets pour la remontée continue de données par des capteurs physiques.

[SEC] Reverse Proxy & Chiffrement : Mise en place de Nginx en frontal pour centraliser le trafic, masquer le port de l'API (8080) et chiffrer les échanges de bout en bout via un certificat SSL (Let's Encrypt).

[SEC] Identity & Access Management (IAM) : Intégration de Spring Security avec JWT (JSON Web Tokens) pour sécuriser les routes de l'API et implémenter une gestion fine des droits utilisateurs (Rôles Admin/User).

[OPS] Observabilité & Monitoring : Déploiement d'une stack de supervision (ex: Prometheus + Grafana) pour surveiller la santé des conteneurs, l'utilisation RAM/CPU de l'instance AWS, et les métriques applicatives (Spring Boot Actuator).

👨‍💻 À propos

Mouhamadou Habib DIAO
