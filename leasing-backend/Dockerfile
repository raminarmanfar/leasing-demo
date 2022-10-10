FROM openjdk:17-jdk-alpine
VOLUME /tmp
ENV spring_profiles_active=prod
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
EXPOSE 6868
