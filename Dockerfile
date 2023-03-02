FROM amazoncorretto:19-alpine-jdk
COPY build/*.jar app.jar

EXPOSE 443
ENTRYPOINT ["java","-jar","/app.jar"]