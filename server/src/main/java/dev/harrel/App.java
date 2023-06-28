package dev.harrel;

import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.Logger;
import io.javalin.Javalin;
import io.javalin.config.JavalinConfig;

import java.util.Map;
import java.util.function.Consumer;

import static ch.qos.logback.classic.Logger.ROOT_LOGGER_NAME;

public class App {

    public static void main(String[] args) {
        Logger root = (Logger) org.slf4j.LoggerFactory.getLogger(ROOT_LOGGER_NAME);
        root.setLevel(Level.INFO);

        String version = System.getenv().getOrDefault("TAG", "unspecified");
        Consumer<JavalinConfig> configConsumer = config -> {
            config.spaRoot.addFile("/", "/web/index.html");
            config.staticFiles.add(staticFiles -> {
                staticFiles.directory = "/web/assets";
                staticFiles.hostedPath = "/assets";
                staticFiles.precompress = true;
                staticFiles.headers = Map.of("Cache-Control", "max-age=86400");
            });
            config.staticFiles.add(staticFiles -> {
                staticFiles.directory = "/robots";
                staticFiles.hostedPath = "/";
            });
        };

        Javalin.create(configConsumer)
                .get("/api/version", ctx -> ctx.json(version))
                .post("/api/json-validate", new ValidationHandler())
                .start(8080);
    }
}
