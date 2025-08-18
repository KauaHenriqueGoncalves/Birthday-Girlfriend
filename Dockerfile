# Etapa 1: Build com Gradle
FROM gradle:8.10.2-jdk23 AS builder
WORKDIR /app

# Copia arquivos de build primeiro para cache de dependências
COPY build.gradle settings.gradle ./
RUN gradle build --no-daemon || true

# Copia o código restante
COPY . .
RUN gradle bootJar --no-daemon

# Etapa 2: Imagem final só com o JAR
FROM eclipse-temurin:23-jre AS runtime
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]