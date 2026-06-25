# Étape 1 : Construction de l'application (Build)
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copier d'abord uniquement le pom.xml
COPY pom.xml .

# Télécharger les dépendances hors ligne pour optimiser le cache Docker
# (Si le code change mais pas les dépendances, Docker ne retélécharge pas tout)
RUN mvn dependency:go-offline -B

# Copier le reste du code source
COPY src ./src

# Compiler le projet en ignorant les tests pour un build plus rapide
RUN mvn clean package -DskipTests

# Étape 2 : Image d'exécution (Run) ultra-légère
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Récupérer le fichier JAR compilé lors de l'étape 1
COPY --from=build /app/target/*.jar app.jar

# Exposer le port par défaut de Spring Boot
EXPOSE 8080

# Commande pour démarrer l'application
ENTRYPOINT ["java", "-jar", "app.jar"]