package dev.harrel;

import io.avaje.jex.Jex;
import io.avaje.jex.core.json.Jackson3JsonService;
import io.avaje.jex.staticcontent.StaticContent;

public class App {

    static void main() {
        StaticContent robots =
                StaticContent.ofClassPath("/robots/robots.txt")
                        .route("/robots.txt")
                        .build();
        StaticContent webBundle =
                StaticContent.ofClassPath("/web")
                        .route("/*")
                        .spaRoot("index.html")
                        .putResponseHeader("Cache-Control", "max-age=86400")
                        .preCompress()
                        .build();

        Jex.create()
                .plugin(robots)
                .plugin(webBundle)
                .jsonService(new Jackson3JsonService())
                .get("/api/version", new VersionHandler())
                .post("/api/json-validate", new ValidationHandler())
                .port(8080)
                .start();
    }
}
