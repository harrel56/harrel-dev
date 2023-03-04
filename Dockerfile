FROM amazoncorretto:19-alpine-jdk
COPY build/*.jar app.jar

EXPOSE 443
ENTRYPOINT ["java", "-jar","-Dspring.profiles.active=prod", "/app.jar"]