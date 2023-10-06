FROM bellsoft/liberica-runtime-container:jre-21-slim-glibc
COPY build/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]