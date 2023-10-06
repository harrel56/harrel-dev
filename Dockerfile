FROM bellsoft/liberica-openjre-alpine:21
COPY build/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]