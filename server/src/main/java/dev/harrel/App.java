package dev.harrel;

import io.javalin.Javalin;
import io.javalin.config.JavalinConfig;
import io.javalin.util.ConcurrencyUtil;

import java.util.Map;
import java.util.function.Consumer;

public class App {

    public static void main(String[] args) {
        ConcurrencyUtil.INSTANCE.setUseLoom(false);
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
                .get("/api/version", new VersionHandler())
                .post("/api/json-validate", new ValidationHandler())
                .start(8080);
    }
}
