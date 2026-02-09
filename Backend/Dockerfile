# Use Maven image to build
FROM maven:3.9-eclipse-temurin-17 AS builder

WORKDIR /app

# Copy pom.xml first for dependency caching
COPY Backend/pom.xml .
RUN ./mvnw dependency:go-offline -B || mvn dependency:go-offline -B

# Copy source and build
COPY Backend/src ./src
RUN ./mvnw clean package -DskipTests || mvn clean package -DskipTests

# Final image with Java runtime
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy built jar from builder
COPY --from=builder /app/target/*.jar app.jar

# Expose port
EXPOSE 9090

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
