FROM eclipse-temurin:23-alpine
ARG BUILD_VERSION=unknown
ENV BUILD_VERSION=${BUILD_VERSION}
COPY build/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]