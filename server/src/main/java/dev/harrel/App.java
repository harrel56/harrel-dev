package dev.harrel;

import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.Logger;
import gg.jte.ContentType;
import gg.jte.TemplateEngine;
import gg.jte.resolve.ResourceCodeResolver;
import io.javalin.Javalin;
import io.javalin.config.JavalinConfig;
import io.javalin.rendering.template.JavalinJte;

import java.nio.file.Path;
import java.util.Map;
import java.util.function.Consumer;

import static ch.qos.logback.classic.Logger.ROOT_LOGGER_NAME;

public class App {

    public static void main(String[] args) {
        Logger root = (Logger) org.slf4j.LoggerFactory.getLogger(ROOT_LOGGER_NAME);
        root.setLevel(Level.INFO);

        TemplateEngine templateEngine = TemplateEngine.create(new ResourceCodeResolver("templates"), Path.of("jte-generated"), ContentType.Html);
        JavalinJte.init(templateEngine);

        String version = System.getenv().getOrDefault("TAG", "unspecified");
        Consumer<JavalinConfig> configConsumer = config -> {
            config.staticFiles.add("/web");
            config.spaRoot.addHandler("/", ctx -> ctx.render("index.jte", Map.of("version", version)));
        };
        try (var server = Javalin.create(configConsumer)) {
            server.start(8080);
        }
    }
}
