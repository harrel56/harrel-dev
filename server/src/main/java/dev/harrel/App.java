package dev.harrel;

import io.avaje.jex.Jex;
import io.avaje.jex.core.json.Jackson3JsonService;
import io.avaje.jex.staticcontent.StaticContent;

public class App {

    public static void main(String[] args) {
//        Consumer<JavalinConfig> configConsumer = config -> {
//            config.spaRoot.addFile("/", "/web/index.html");
//            config.staticFiles.add(staticFiles -> {
//                staticFiles.directory = "/web/assets";
//                staticFiles.hostedPath = "/assets";
//                staticFiles.precompress = true;
//                staticFiles.headers = Map.of("Cache-Control", "max-age=86400");
//            });
//            config.staticFiles.add(staticFiles -> {
//                staticFiles.directory = "/robots";
//                staticFiles.hostedPath = "/";
//            });
//        };
        StaticContent webRoot =
                StaticContent.ofClassPath("/web/index.html")
                        .route("/*")
                        .build();
        StaticContent webBundle =
                StaticContent.ofClassPath("/web/assets")
                        .route("/assets")
                        .preCompress()
                        .putResponseHeader("Cache-Control", "max-age=86400")
                        .build();
        StaticContent robots =
                StaticContent.ofClassPath("/robots/robots.txt")
                        .route("/robots.txt")
                        .build();

        Jex.create()
                .plugin(webRoot)
                .plugin(webBundle)
                .plugin(robots)
                .jsonService(new Jackson3JsonService())
                .get("/api/version", new VersionHandler())
                .post("/api/json-validate", new ValidationHandler())
                .port(8080)
                .start();
    }
}
