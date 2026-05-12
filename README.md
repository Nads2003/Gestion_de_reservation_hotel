# Projet Réservation Hôtel

Application de réservation d’hôtel développée avec :

- Frontend : React + Tailwind CSS
- Backend : Spring Boot
- Base de données : postgreSQL

## Prérequis

Installer :

- Node.js :v22.16.0
- Java JDK 17+
- Maven
- PostgreSQL

---

## Installation

### 1. Cloner le projet

```bash
git clone https://github.com/Nads2003/Gestion_de_reservation_hotel

```

---

## Backend (Spring Boot)

Aller dans le dossier backend :

```bash
cd reservationbackend
```

Installer les dépendances et lancer :

```bash
mvn clean install
mvn spring-boot:run
```

Configurer la base de données dans :

`src/main/resources/application.properties`

Exemple :

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/hotel_db
spring.datasource.username=votre nom
spring.datasource.password=votre mdp

# JPA / HIBERNATE
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

---

## Frontend (React)

Aller dans le dossier frontend :

```bash
cd front/hotel-front
```

Installer les dépendances :

```bash
npm install
```

Lancer :

```bash
npm run dev
```

---

## Accès

Frontend :

http://localhost:5173

Backend :

http://localhost:8080c