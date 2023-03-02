FROM amazoncorretto:19-alpine-jdk
COPY ./build/harrel-dev-0.0.1.jar app.jar

EXPOSE 443
ENTRYPOINT ["java","-jar","/app.jar"]