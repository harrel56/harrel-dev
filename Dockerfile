FROM amazoncorretto:19-alpine-jdk
COPY build/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]