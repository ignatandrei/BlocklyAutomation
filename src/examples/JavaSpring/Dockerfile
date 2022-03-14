
#Build from java soruces
FROM maven:3.8 as compile

COPY .mvn .mvn
COPY pom.xml .

RUN mvn -B dependency:go-offline                          

COPY src src

RUN mvn -B package  
# copy from PC to /usr/src/mymaven and set the work dir
#COPY . /usr/src/mymaven
#WORKDIR /usr/src/mymaven

#RUN mvn clean install

#Deploy iy
FROM openjdk:17-alpine3.14
EXPOSE 8080
#ARG JAR_FILE=/root/.m2/repository/com/chestiiautomate/math-operations/0.0.1-SNAPSHOT/math-operations-0.0.1-SNAPSHOT.jar
ARG JAR_FILE=/target/math-operations-0.0.1-SNAPSHOT.jar 
COPY --from=compile ${JAR_FILE} math-operations-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","/math-operations-0.0.1-SNAPSHOT.jar"]
#ENTRYPOINT ["tail", "-f", "/dev/null"]