FROM maven:3.9.1-eclipse-temurin-17-alpine AS build
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:17
COPY --from=build /target/hkiapp-backend-0.0.1-SNAPSHOT.jar hkiapp-backend.jar

EXPOSE 8080
ENTRYPOINT [ "java", "-jar", "hkiapp-backend.jar" ]