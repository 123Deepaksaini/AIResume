# ===== Stage 1: Build =====
FROM maven:3.9-eclipse-temurin-17 AS builder

WORKDIR /app

# Copy pom.xml first (dependency cache)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Build jar
RUN mvn clean package -DskipTests

# ===== Stage 2: Runtime =====
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy jar from builder
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]